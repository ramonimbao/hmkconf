import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
} from "../common/keyboard-editor"

export function RemapTab() {
  return (
    <KeyboardEditor>
      <KeyboardEditorLayout>
        <KeyboardEditorHeader></KeyboardEditorHeader>
        <KeyboardEditorKeyboard
          elt={(key) => (
            <div className="size-full p-0.5">
              <div className="size-full rounded-md border text-center">
                {key}
              </div>
            </div>
          )}
        />
      </KeyboardEditorLayout>
      <div></div>
    </KeyboardEditor>
  )
}
