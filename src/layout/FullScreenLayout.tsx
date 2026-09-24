import { Outlet } from "react-router-dom";

export function FullScreenLayout() {
  return (
    <div className="flex h-full flex-col">
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingTop: "var(--tg-safe-area-inset-top)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
