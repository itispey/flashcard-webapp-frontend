import { BookOpenText, User, Search } from "lucide-react"
import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"

const TABS = [
  { to: "/", label: "Library", icon: BookOpenText, end: true },
  { to: "/explore", label: "Explore", icon: Search, end: false },
  { to: "/profile", label: "Profile", icon: User, end: false },
]

export function BottomTabBar() {
  return (
    <nav
      className="flex shrink-0 items-stretch border-t border-border/60 bg-card"
      style={{ paddingBottom: "var(--tg-safe-area-inset-bottom)" }}
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          <Icon className="size-6" strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
