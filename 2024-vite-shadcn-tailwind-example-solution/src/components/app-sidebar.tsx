import { Home, Inbox } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#home",
    icon: Home,
  },
  {
    title: "Example: Zustand",
    url: "#example-zustand",
    icon: Inbox,
  },
  {
    title: "Example: React Query",
    url: "#example-react-query",
    icon: Inbox,
  },
  {
    title: "Example: Suspense Lazy",
    url: "#example-suspense-lazy",
    icon: Inbox,
  },
  {
    type: 'header',
    title: 'Tasks',
  },
  {
    type: 'separator',
  },
  {
    title: "Task: Grocery App",
    url: "#task-grocery-app",
    icon: Inbox,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.type === 'header' ? (
                  <SidebarHeader key={item.title}>{item.title}</SidebarHeader>
                ) :
                item.type === 'separator' ? (
                  <SidebarSeparator />
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
