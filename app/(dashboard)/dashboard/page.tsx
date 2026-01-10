"use client";
import { BarChart } from "recharts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getMonthlyActivity } from "@/module/dashboard/actions";
import { queryKey } from "@/config/queryKey";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";

const page = () => {
  const {data:stats, isLoading:statsLoading} = useQuery({
    queryKey: [queryKey.DASHBOARD_STATS],
    queryFn: async () => await getDashboardStats(),
    refetchOnWindowFocus: false, 
  }) 

  const {data:monthlyActivity, isLoading:monthlyActivityLoading} = useQuery({
    queryKey: [queryKey.MONTHLY_ACTIVITY],
    queryFn: async () => await getMonthlyActivity(),
  })
  return (
    <>
    <div className="space-y-6 ">
      <div> 
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your coding activity and AI reviews</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading? "Loading..." : stats?.totalRepo || 0}</div>
            <p className="text-xs text-muted-foreground">Connected repositories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading? "Loading..." : stats?.totalCommits || 0}</div>
            <p className="text-xs text-muted-foreground">Total commits</p>
          </CardContent>
        </Card>

      </div>
    </div>
    </>
  )
} 

export default page