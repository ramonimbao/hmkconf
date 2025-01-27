"use client"

import {
  KeyTesterKeyPress,
  KeyTesterKeyRelease,
  KeyTesterProvider,
} from "../common/key-tester"

export function KeyTesterTab() {
  return (
    <div className="grid gap-4 rounded-md border bg-card p-4 shadow-sm">
      <KeyTesterProvider>
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Pressed Keys
          </p>
          <KeyTesterKeyPress className="mt-2 h-24 max-w-72" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Released Keys
          </p>
          <KeyTesterKeyRelease className="mt-2 h-24 max-w-72" />
        </div>
      </KeyTesterProvider>
    </div>
  )
}
