import { useGetActuations } from "@/api/use-get-actuations"
import { useSetActuations } from "@/api/use-set-actuations"
import { useConfigurator } from "@/components/providers/configurator-provider"
import {
  DEFAULT_ACTUATION,
  DEFAULT_RT_DOWN,
  SWITCH_DISTANCE,
} from "@/constants/devices"
import { DeviceActuation } from "@/types/devices"
import { produce } from "immer"
import { useEffect, useState } from "react"
import { DistanceSlider } from "../common/distance-slider"
import { Switch } from "../common/switch"

export function ActuationSettings() {
  const {
    profileNum,
    performance: { keys },
  } = useConfigurator()

  const { isSuccess, data: actuations } = useGetActuations(profileNum)
  const { mutate: setActuations } = useSetActuations(profileNum)

  const disabled = !isSuccess || keys.length === 0

  const [uiActuation, setUIActuation] =
    useState<DeviceActuation>(DEFAULT_ACTUATION)

  const updateActuation = (actuation: DeviceActuation) =>
    !disabled &&
    setActuations(
      produce(actuations, (draft) => {
        for (const key of keys) {
          draft[key] = actuation
        }
      }),
    )

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    setUIActuation(
      keys.length === 0 ? DEFAULT_ACTUATION : actuations[keys[keys.length - 1]],
    )
  }, [actuations, isSuccess, keys])

  return (
    <div className="mx-auto flex w-full max-w-5xl">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DistanceSlider
          disabled={disabled}
          title="Actuation Point"
          description="Set the distance at which the key press is registered."
          min={1}
          max={SWITCH_DISTANCE}
          distance={uiActuation.actuationPoint}
          onDistanceChange={(actuationPoint) =>
            setUIActuation({ ...uiActuation, actuationPoint })
          }
          onDistanceCommit={() => updateActuation(uiActuation)}
        />
        {uiActuation.rtDown > 0 && (
          <>
            <DistanceSlider
              disabled={disabled}
              title={
                uiActuation.rtUp === 0
                  ? "Rapid Trigger Sensitivity"
                  : "Rapid Trigger Press Sensitivity"
              }
              description={
                uiActuation.rtUp === 0
                  ? "Set the distance change required to register a key press when Rapid Trigger is active."
                  : "Set the press distance required to register a key press when Rapid Trigger is active."
              }
              min={1}
              max={SWITCH_DISTANCE}
              distance={uiActuation.rtDown}
              onDistanceChange={(rtDown) =>
                setUIActuation({ ...uiActuation, rtDown })
              }
              onDistanceCommit={() => updateActuation(uiActuation)}
            />
            {uiActuation.rtUp > 0 && (
              <DistanceSlider
                disabled={disabled}
                title="Rapid Trigger Release Sensitivity"
                description="Set the release distance required to register a key release when Rapid Trigger is active."
                min={1}
                max={SWITCH_DISTANCE}
                distance={uiActuation.rtUp}
                onDistanceChange={(rtUp) =>
                  setUIActuation({ ...uiActuation, rtUp })
                }
                onDistanceCommit={() => updateActuation(uiActuation)}
              />
            )}
          </>
        )}
      </div>
      <div className="flex w-96 flex-col gap-4 p-4">
        <Switch
          disabled={disabled}
          id="rapid-trigger"
          title="Rapid Trigger"
          description="Rapid Trigger registers a key press or release based on the change in key position and the direction of that change. It activates when the key is pressed past the actuation point and deactivates when the key is released past the actuation point."
          checked={uiActuation.rtDown > 0}
          onCheckedChange={(rtEnabled) =>
            updateActuation({
              ...uiActuation,
              rtDown: rtEnabled ? DEFAULT_RT_DOWN : 0,
              rtUp: 0,
              continuous: false,
            })
          }
        />
        {uiActuation.rtDown > 0 && (
          <>
            <Switch
              disabled={disabled}
              id="separate-sensitivity"
              title="Separate Press/Release Sensitivity"
              description="Allow Rapid Trigger to have different sensitivity settings for key press and key release."
              checked={uiActuation.rtUp > 0}
              onCheckedChange={(separateSensitivityEnabled) =>
                updateActuation({
                  ...uiActuation,
                  rtUp: separateSensitivityEnabled ? uiActuation.rtDown : 0,
                })
              }
            />
            <Switch
              disabled={disabled}
              id="continuous"
              title="Continuous Rapid Trigger"
              description="Deactivate Rapid Trigger only when the key is fully released."
              checked={uiActuation.continuous}
              onCheckedChange={(continuous) =>
                updateActuation({ ...uiActuation, continuous })
              }
            />
          </>
        )}
      </div>
    </div>
  )
}
