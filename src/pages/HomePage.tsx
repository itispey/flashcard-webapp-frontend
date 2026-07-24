import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HomePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground text-sm">
          This screen is a starting point — replace it with your app's content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected to your theme</CardTitle>
          <CardDescription>
            Colors here follow Telegram's light/dark theme automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => toast("Hello from the boilerplate")}>Show a toast</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Talking to the backend</CardTitle>
          <CardDescription>
            Check the Profile tab — it calls FastAPI with your Telegram identity attached.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
