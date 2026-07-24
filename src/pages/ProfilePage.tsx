import { useLaunchParams } from "@tma.js/sdk-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/use-current-user"

export function ProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser()
  const launchParams = useLaunchParams(true)
  const telegramUser = launchParams.tgWebAppData?.user

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="pt-2 text-2xl font-semibold">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>From your backend</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {isLoading && (
            <>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-28" />
            </>
          )}

          {isError && (
            <p className="text-sm text-muted-foreground">
              Couldn't reach the backend yet — start the FastAPI server and this will populate.
            </p>
          )}

          {user && (
            <>
              <p className="text-sm">
                <span className="text-muted-foreground">Name: </span>
                {user.first_name} {user.last_name ?? ""}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Username: </span>
                {user.username ?? "—"}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Telegram ID: </span>
                {user.telegram_id}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {telegramUser && (
        <Card>
          <CardHeader>
            <CardTitle>From Telegram launch data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Read directly from Telegram, no network call — useful before the backend responds.
            </p>
            <p className="mt-2 text-sm">
              {telegramUser.firstName} {telegramUser.lastName ?? ""}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
