import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api"

export interface Category {
  id: number
  name: string
  description: string | null
  author_id: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface CategoryCreatePayload {
  name: string
  description?: string | null
  is_public: boolean
}

async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/api/v1/categories/")
  return data
}

async function createCategory(payload: CategoryCreatePayload): Promise<Category> {
  const { data } = await api.post<Category>("/api/v1/categories/", payload)
  return data
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })
}
