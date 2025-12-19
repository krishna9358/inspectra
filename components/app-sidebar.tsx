"use client"
import React from 'react'
import { Github, BookOpen, Settings, Moon, Sun, LogOut } from "lucide-react" 
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation" 
import { useSession } from "@/lib/auth-client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, 
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link" 
import Logout from "@/module/auth/components/logout-button"
import { Button } from './ui/button'
import LogoutButton from '@/module/auth/components/logout-button'

export const AppSidebar = () => {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-full w-full animate-pulse bg-muted" />
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
            href: "/dashboard/repository",
        },
        {
            icon: BookOpen,
            label: "Reviews",
            href: "/dashboard/reviews",
        },
        {
            icon: BookOpen,
            label: "Subscription",
            href: "/dashboard/subscription",
        },
        {
            icon: Settings,
            label: "Settings",
            href: "/dashboard/settings",
        },
    ]
    
    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/dashboard")  
    const user = session?.user;
    const avatar = user?.image || "https://github.com/shadcn.png"
    const name = user?.name || "Guest"
    const email = user?.email || "" 
  return (
    <Sidebar>
        <SidebarContent>
            <SidebarHeader>
                {/* Connected Account  Details */}
                <div className="flex flex-col gap-4 px-2 py-6">
                    <div className="flex items-center gap-4 px-3 py-4 rounded-1g bg-sidebar-accent/50
                    hover: bg-sidebar-accent/70 transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground flex-shrink-o">
                            <Github className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-ø">
                            <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">Connected Account</p>
                            <p className="text-sm font-medium text-sidebar-foreground/90">@{name}</p>
                        </div>
                    </div>
                </div>
                {/* Navigation Items */}
                <SidebarMenu  >
                    {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.href}  >
                            <SidebarMenuButton asChild isActive={isActive(item.href)} >
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
        <SidebarFooter>
            {/* User Profile */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Avatar>
                            <AvatarImage src={avatar} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button> 
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <LogoutButton>
                            <LogOut className="w-4 h-4" />
                            Logout
                        </LogoutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
