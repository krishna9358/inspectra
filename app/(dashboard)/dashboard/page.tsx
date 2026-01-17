"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getMonthlyActivity,
} from "@/module/dashboard/actions";
import { queryKey } from "@/config/queryKey";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";
import ContributionGraph from "@/module/dashboard/component/contribution-graph";
import { Spinner } from "@/components/ui/spinner";

const Page = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: [queryKey.DASHBOARD_STATS],
    queryFn: async () => await getDashboardStats(),
    refetchOnWindowFocus: false,
  });

  const { data: monthlyActivity, isLoading: monthlyActivityLoading } = useQuery(
    {
      queryKey: [queryKey.MONTHLY_ACTIVITY],
      queryFn: async () => await getMonthlyActivity(),
    },
  );
  return (
    <>
      <div className="space-y-6 ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your coding activity and AI reviews
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Repositories
              </CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "Loading..." : stats?.totalRepo || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Connected repositories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commits
              </CardTitle>
              <GitCommit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "Loading..." : stats?.totalCommits || 0}
              </div>
              <p className="text-xs text-muted-foreground">In the last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PRs</CardTitle>
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "Loading..." : stats?.totalPrs || 0}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "Loading..." : stats?.totalReviews || 0}
              </div>
              <p className="text-xs text-muted-foreground">Generated reviews</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Contribution Activity</CardTitle>
            <CardDescription>
              Visualizing your coding frequency over the last year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionGraph />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Activity Overview</CardTitle>
              <CardDescription>
                Monthly Breakdown of commits, PRs, and AI reviews ( Last 6
                Months )
              </CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyActivityLoading ? (
                <div className="h-80 w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <div className="h-80 w-full ">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyActivity || []}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderRadius: "4px",
                          padding: "8px",
                          borderColor: "var(--border)",
                          borderWidth: "1px",
                        }}
                        itemStyle={{ color: "var(--foreground)" }}
                        cursor={{
                          fill: "var(--background)",
                          stroke: "var(--border)",
                          strokeWidth: 1,
                        }}
                      />
                      <Legend />
                      <Bar dataKey="commits" fill="#8884d8" />
                      <Bar dataKey="prs" fill="#894921" />
                      <Bar dataKey="reviews" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
