import { init, themeParams, viewport, miniApp, isTMA } from "@tma.js/sdk";
import { type ReactNode, useEffect, useState } from "react";

import { bindTelegramViewportVars } from "@/telegram/theme";

/**
 * True when the app is actually running inside Telegram (vs. a plain
 * browser during local development, e.g. `npm run dev` in Chrome).
 * Useful for guarding calls to Telegram-only APIs.
 */
export function isRunningInTelegram() {
  return isTMA();
}

/**
 * Boots the Telegram Mini Apps SDK once, before the rest of the app renders.
 * Safe to mount outside Telegram too — falls through quietly so you can
 * still develop and preview the UI in a regular browser tab.
 */
export function TelegramProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isRunningInTelegram()) {
      // Not inside Telegram (e.g. local browser dev) — skip SDK init,
      // render the app anyway so you can still iterate on UI.
      setReady(true);
      return;
    }

    init();

    themeParams.mount();
    // themeParams.bindCssVars() // sets --tg-theme-* vars used in index.css

    let cleanupViewport: (() => void) | undefined;
    viewport
      .mount()
      .then(async () => {
        // try {
        //   await viewport.requestFullscreen();
        // } catch {
        //   // Older Telegram client without fullscreen support — ignore.
        // }
        viewport.bindCssVars();
        cleanupViewport = bindTelegramViewportVars();
      })
      .catch(() => {
        // Older Telegram client without viewport support — ignore, CSS
        // fallback values from index.css will be used.
      });

    try {
      miniApp.mount();
      miniApp.bindCssVars();
      miniApp.ready(); // tells Telegram the app has loaded; hides its loading spinner
    } catch {
      // Older Telegram client without this feature — ignore.
    }

    setReady(true);

    return () => {
      cleanupViewport?.();
    };
  }, []);

  // Avoid a flash of unstyled/untheme content before Telegram's real theme
  // colors are bound.
  if (!ready) return null;

  return <>{children}</>;
}
