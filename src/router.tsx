import { createBrowserRouter } from "react-router-dom"

import { CreateCategoryPage } from "@/features/categories/CreateCategoryPage"
import { HomePage } from "@/features/home/HomePage"
import { ProfilePage } from "@/features/profile/ProfilePage"
import { AppLayout } from "@/layout/AppLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories/new", element: <CreateCategoryPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
])
