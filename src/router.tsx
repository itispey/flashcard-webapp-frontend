import { createBrowserRouter } from "react-router-dom"

import { AppLayout } from "@/components/layout/AppLayout"
import { CreateCategoryPage } from "@/pages/CreateCategoryPage"
import { HomePage } from "@/pages/HomePage"
import { ProfilePage } from "@/pages/ProfilePage"

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
