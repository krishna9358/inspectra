"use client";
import React from "react";
import { Github, BookOpen, Settings, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { Button } from "./ui/button";
import LogoutButton from "@/module/auth/components/logout-button";

export const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full animate-pulse bg-muted" />;
  }

  const navigationItems = [
    {
      icon: BookOpen,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Github,
      label: "Repository",
      href: "/repository",
    },
    {
      icon: BookOpen,
      label: "Reviews",
      href: "/reviews",
    },
    {
      icon: BookOpen,
      label: "Subscription",
      href: "/subscription",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/dashboard");
  const user = session?.user;
  const avatar = user?.image || "https://github.com/shadcn.png";
  const name = user?.name || "Guest";
  const email = user?.email || "";
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          {/* Connected Account  Details */}
          <div className="flex flex-col gap-4 px-2 py-6">
            <div
              className="flex items-center gap-4 px-3 py-4 rounded-lg bg-sidebar-accent/50
                    hover:bg-sidebar-accent/70 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                <Github className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                  Connected Account
                </p>
                <p className="text-sm font-medium text-sidebar-foreground/90">
                  @{name}
                </p>
              </div>
            </div>
          </div>
          {/* Navigation Items */}

          <SidebarContent>
            <div className="m-2">
              <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                MENU
              </p>
            </div>
          </SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.href} className="p-1">
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className={`h-10 px-4 rounded-lg transition-colors duration-200 ${isActive(item.href) ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "hover:bg-sidebar-accent/50 text-sidebar-foreground"}`}
                >
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarHeader>
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-4">
        {/* User Profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                      {name}
                    </p>
                    <p className="text-xs font-medium text-sidebar-foreground/90">
                      {email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 rounded-lg "
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="py-2"
                >
                  {theme === "dark" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="border-t pt-2">
                  <LogoutButton className="w-full flex items-center gap-2 cursor-pointer ">
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Logout</span>
                  </LogoutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
