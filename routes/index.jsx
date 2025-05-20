import Detection from "../src/Components/Detection"
import AddData from "../src/Components/AddData"
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SidebarProvider } from "../src/Components/ui/sidebar";
import AppSideBar from "../src/Components/AppSideBar";
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSideBar />
        <main className="container-custom">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Detection />,
      },
      {
        path: "/add-data",
        element: <AddData />,
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
]);