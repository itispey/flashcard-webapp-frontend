import { Plus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateCollection,
  useCollections,
} from "@/features/collections/hooks/use-collections";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useBackButton } from "@/telegram/hooks/use-back-button";

export function CategoryHomePage() {
  useBackButton();

  const { categoryId } = useParams();
  const id = Number(categoryId);
  const { data: categories } = useCategories();
  const { data: collections, isLoading, isError } = useCollections(id);
  const createCollection = useCreateCollection(id);
  const [name, setName] = useState("");
  const category = categories?.find((item) => item.id === id);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Collection name is required");
      return;
    }

    try {
      await createCollection.mutateAsync(trimmedName);
      setName("");
      toast.success("Collection created");
    } catch {
      toast.error("Could not create collection");
    }
  }

  return (
    <div className="flex min-h-full flex-col gap-5 p-4 pb-28">
      <div className="flex items-start gap-3 pt-2">
        <div>
          <h1 className="text-2xl font-semibold">
            {category?.name ?? "Category"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Collections in this category.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Label htmlFor="collection-name">New collection</Label>
          <Input
            id="collection-name"
            placeholder="e.g. Common verbs"
            maxLength={64}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          aria-label="Add collection"
          disabled={createCollection.isPending}
        >
          <Plus className="size-5" />
        </Button>
      </form>

      {isLoading && <Skeleton className="h-20 w-full rounded-2xl" />}
      {isError && (
        <p className="text-muted-foreground text-sm">
          Couldn&apos;t load collections.
        </p>
      )}
      {!isLoading && !isError && collections?.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No collections yet</CardTitle>
            <CardDescription>
              Add a collection to start organizing flashcards.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {!isLoading && !isError && collections && collections.length > 0 && (
        <div className="flex flex-col gap-3">
          {collections.map((collection) => (
            <Link to={`/collections/${collection.id}`} key={collection.id}>
              <Card key={collection.id} interactive>
                <CardContent className="flex items-center justify-between py-4">
                  <CardTitle>{collection.name}</CardTitle>
                  <span className="text-muted-foreground text-xs">
                    {new Date(collection.created_at).toLocaleDateString()}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
