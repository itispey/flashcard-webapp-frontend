import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { TelegramProvider } from "@/telegram/TelegramProvider"
import { useTelegramTheme } from "@/telegram/theme"
import { router } from "@/router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function ThemedApp() {
  // Keeps <html class="dark"> and toast theme in sync with Telegram's theme.
  useTelegramTheme()
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export function App() {
  return (
    <TelegramProvider>
      <QueryClientProvider client={queryClient}>
        <ThemedApp />
      </QueryClientProvider>
    </TelegramProvider>
  )
}
