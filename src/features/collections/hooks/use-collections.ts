import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api"

export interface Collection {
  id: number
  name: string
  category_id: number
  created_at: string
  updated_at: string
}

async function fetchCollections(categoryId: number): Promise<Collection[]> {
  const { data } = await api.get<Collection[]>(`/api/v1/categories/${categoryId}/collections`)
  return data
}

async function createCollection(categoryId: number, name: string): Promise<Collection> {
  const { data } = await api.post<Collection>(
    `/api/v1/categories/${categoryId}/collections`,
    { name },
  )
  return data
}

export function useCollections(categoryId: number) {
  return useQuery({
    queryKey: ["collections", categoryId],
    queryFn: () => fetchCollections(categoryId),
    enabled: Number.isInteger(categoryId),
  })
}

export function useCreateCollection(categoryId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => createCollection(categoryId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections", categoryId] })
    },
  })
}