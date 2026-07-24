import { useSignal } from "@tma.js/sdk-react"
import { themeParams, viewport } from "@tma.js/sdk"
import { useEffect, useState } from "react"

/**
 * Reads Telegram's live theme (light/dark, per Telegram's own background
 * color heuristic) and viewport safe-area info. Falls back to the OS
 * `prefers-color-scheme` when running outside Telegram, e.g. in a plain
 * browser during development.
 */
export function useTelegramTheme() {
  const isTmaDark = useSignal(themeParams.isDark)
  const [fallbackDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
  )

  const isMounted = useSignal(themeParams.isMounted)
  const isDark = isMounted ? isTmaDark : fallbackDark

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return { colorScheme: isDark ? ("dark" as const) : ("light" as const) }
}

/**
 * Binds Telegram's viewport height + safe-area insets to CSS variables so
 * layouts can avoid Telegram's own header chrome and the device notch/home
 * indicator. Call once near the app root.
 */
export function bindTelegramViewportVars() {
  if (!viewport.isMounted()) return

  const root = document.documentElement

  const apply = () => {
    root.style.setProperty("--tg-viewport-height", `${viewport.height()}px`)
    root.style.setProperty("--tg-viewport-stable-height", `${viewport.stableHeight()}px`)
    root.style.setProperty("--tg-safe-area-inset-top", `${viewport.safeAreaInsetTop()}px`)
    root.style.setProperty(
      "--tg-safe-area-inset-bottom",
      `${viewport.safeAreaInsetBottom()}px`
    )
  }

  apply()
  // These are Computed signals from @tma.js/signals; re-apply on any change.
  const unsubs = [
    viewport.height.sub(apply),
    viewport.stableHeight.sub(apply),
    viewport.safeAreaInsetTop.sub(apply),
    viewport.safeAreaInsetBottom.sub(apply),
  ]

  return () => unsubs.forEach((unsub) => unsub())
}
