import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

export interface CurrentUser {
  id: number
  telegram_id: number
  first_name: string
  last_name: string | null
  username: string | null
  photo_url: string | null
}

async function fetchCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>("/api/v1/users/me")
  return data
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
