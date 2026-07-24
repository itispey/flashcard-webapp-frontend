import { useTelegramTheme } from "@/telegram/theme"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { colorScheme } = useTelegramTheme()

  return (
    <Sonner
      theme={colorScheme}
      className="toaster group"
      position="top-center"
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
