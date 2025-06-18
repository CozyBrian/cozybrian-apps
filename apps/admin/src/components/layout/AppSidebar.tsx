import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@cozy/ui'
import { ChevronUp, Code, FileText, Folder, FolderGit2, Home, Inbox, LogOut, ScrollText, Settings, User2 } from 'lucide-react'

// Menu items.
const items = [
  {
    title: "Projects",
    url: "#",
    icon: Folder,
  },
  {
    title: "Posts",
    url: "#",
    icon: FileText,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='flex-row px-4 font-comfortaa items-center gap-3'>
          <img src="/favicon-96x96.png" alt="Logo" className="size-6" />
          <h1 className="text-base font-semibold">Admin Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
            <LogOut className='text-red-500' />
            <span>Logout</span>
            </SidebarMenuButton> 
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar