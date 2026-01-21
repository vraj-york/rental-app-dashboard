"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Database, Home, LayoutGrid, LogOut } from "lucide-react";
import Image from "next/image";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const route = useRouter();
  const pathname = usePathname();
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Properties",
      url: "/properties",
      icon: Home,
    },
    {
      title: "API Data",
      url: "/api-data",
      icon: Database,
    },
  ];

  const handleLogout = () => {
    Cookie.remove("email");
    route.push("/login");
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <a>
            <Image src="/icon.png" alt="Logo" width={32} height={32} />
            Rental Management App
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/"
                        ? pathname === item.url
                        : pathname?.startsWith(item.url)
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
            <SidebarMenuButton
              className="hover:bg-red-400 text-black hover:text-white cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
