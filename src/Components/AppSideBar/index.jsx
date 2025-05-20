import { Bot, ImageUp } from "lucide-react"
import { useLocation, Link } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";


const menuItems = [
  {
    title: "Detection",
    url: "/",
    icon: Bot
  },
  {
    title: "Add Data",
    url: "/add-data",
    icon: ImageUp
  }
]

function AppSideBar() {
  const location = useLocation();

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-center pb-4">
          <span className="text-2xl font-bold">Similarity Detection</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {
                  menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className="py-5"
                      >
                        <Link to={item.url}>
                          <item.icon className="!w-6 !h-6 shrink-0" />
                          <span className="text-base font-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

export default AppSideBar;
