import { Globe, Lock, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCategories } from "@/hooks/use-categories"
import { cn } from "@/lib/utils"

export function HomePage() {
  const { data: categories, isLoading, isError } = useCategories()

  return (
    <div className="relative flex min-h-full flex-col gap-4 p-4 pb-28">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold">Library</h1>
        <p className="text-muted-foreground text-sm">Your flashcard categories.</p>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      )}

      {isError && (
        <p className="text-muted-foreground text-sm">
          Couldn't load categories — make sure the backend is running.
        </p>
      )}

      {!isLoading && !isError && categories?.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No categories yet</CardTitle>
            <CardDescription>
              Create your first category to start organizing flashcards.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && categories && categories.length > 0 && (
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{category.name}</CardTitle>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      category.is_public
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {category.is_public ? (
                      <>
                        <Globe className="size-3" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="size-3" />
                        Private
                      </>
                    )}
                  </span>
                </div>
                {category.description && (
                  <CardDescription>{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-xs">
                  Created {new Date(category.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button
        asChild
        size="icon"
        className="fixed right-4 z-10 size-14 rounded-full shadow-lg"
        style={{ bottom: "calc(4.5rem + var(--tg-safe-area-inset-bottom))" }}
        aria-label="Create a new category"
      >
        <Link to="/categories/new">
          <Plus className="size-6" strokeWidth={2.5} />
        </Link>
      </Button>
    </div>
  )
}
