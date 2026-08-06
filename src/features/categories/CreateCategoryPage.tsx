import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useCreateCategory } from "@/features/categories/hooks/use-categories"

export function CreateCategoryPage() {
  const navigate = useNavigate()
  const createCategory = useCreateCategory()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName) {
      toast.error("Title is required")
      return
    }

    try {
      await createCategory.mutateAsync({
        name: trimmedName,
        description: description.trim() || null,
        is_public: isPublic,
      })
      toast.success("Category created")
      navigate("/")
    } catch {
      toast.error("Could not create category")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold">New category</h1>
        <p className="text-muted-foreground text-sm">
          Organize your flashcards into a category.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Title</Label>
          <Input
            id="name"
            placeholder="e.g. Spanish verbs"
            maxLength={64}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Optional notes about this category"
            maxLength={255}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="is-public">Public</Label>
            <p className="text-muted-foreground text-sm">
              {isPublic ? "Anyone can discover this category" : "Only you can see this category"}
            </p>
          </div>
          <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
        </div>

        <Button type="submit" className="w-full" disabled={createCategory.isPending}>
          {createCategory.isPending ? "Saving…" : "Save"}
        </Button>
      </form>
    </div>
  )
}
