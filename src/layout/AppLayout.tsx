import { Outlet } from "react-router-dom"

import { BottomTabBar } from "@/layout/BottomTabBar"

export function AppLayout() {
  return (
    <div className="flex h-full flex-col">
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingTop: "var(--tg-safe-area-inset-top)" }}
      >
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  )
}
