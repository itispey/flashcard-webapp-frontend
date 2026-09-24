import { createBrowserRouter } from "react-router-dom";

import { CategoryCreatePage } from "@/features/categories/pages/CategoryCreatePage";
import { CategoryHomePage } from "@/features/categories/pages/CategoryHomePage";
import { CollectionHomePage } from "@/features/collections/pages/CollectionHomePage";
import { HomePage } from "@/features/home/HomePage";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { AppLayout } from "@/layout/AppLayout";
import { FullScreenLayout } from "@/layout/FullscreenLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    element: <FullScreenLayout />,
    children: [
      { path: "categories/new", element: <CategoryCreatePage /> },
      { path: "categories/:categoryId", element: <CategoryHomePage /> },
      { path: "collections/:collectionId", element: <CollectionHomePage />}
    ],
  },
]);
