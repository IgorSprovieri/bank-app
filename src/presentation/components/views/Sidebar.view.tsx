import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/presentation/components/ui/sidebar"
import { CollapsibleLogo } from "@/presentation/components/shared/Logo.component"
import { useState, type FC } from "react"

export type SidebarViewProps = {
  children: React.ReactNode
  contentItems?: {
    icon: React.ReactNode
    label: string
    onClick: () => void
  }[]
  footerItems?: {
    icon: React.ReactNode
    label: string
    onClick: () => void
  }[]
}

export const SidebarView: FC<SidebarViewProps> = ({
  children,
  contentItems,
  footerItems,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SidebarProvider
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-0 w-full flex-1"
    >
      <Sidebar
        variant="floating"
        className="flex flex-col items-center justify-between border-none"
        collapsible="icon"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <SidebarHeader>
          <CollapsibleLogo isOpen={isOpen} />
        </SidebarHeader>

        {contentItems && (
          <SidebarContent className="justify-center">
            <SidebarMenu>
              {contentItems?.map((item) => (
                <SidebarMenuItem key={`sidebar-content-button-${item.label}`}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    className="text-background"
                  >
                    {item.icon} {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        )}

        <SidebarFooter className="mb-1 p-0">
          <SidebarMenu>
            {footerItems?.map((item) => (
              <SidebarMenuItem key={`sidebar-footer-button-${item.label}`}>
                <SidebarMenuButton onClick={item.onClick}>
                  {item.icon} {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {children}
    </SidebarProvider>
  )
}
