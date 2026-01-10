"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/config/queryKey";
import { getContributionStats } from "../actions";
import {ActivityCalendar} from "react-activity-calendar";

export default function ContributionGraph() {
    const { theme } = useTheme();
    const { data: contributionData, isLoading, error } = useQuery({
        queryKey: [queryKey.CONTRIBUTION_GRAPH],
        queryFn: async () => await getContributionStats(),
        staleTime: 1000 * 60 * 5 // 5 mins
    })

    if (isLoading) {
        return <div className="w-full flex flex-col items-center justify-center p-8">
            <div className="animate-pulse text-muted-foreground">
                Loading Contribution Stats...
            </div>
        </div>
    }

    if (!contributionData || !contributionData.contributions.length) {
        return <div className="w-full flex flex-col items-center justify-center p-8">
            <div className="text-muted-foreground">
                No contribution stats available
            </div>
        </div>
    }
    return (
        <>
            <div className="w-full flex flex-col items-center gap-4 p-4">
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{contributionData.totalContributions}  </span>
                    contributions in last year
                </div>
                <div className='w-full overflow-x-auto'>
                    <div className=' flex justify-center min-w-max px-4'>
                        <ActivityCalendar
                            data={contributionData.contributions}
                            colorScheme={theme === "dark" ? "dark" : "light"} blockSize={11} blockMargin={4} fontSize={14}
                            showMonthLabels
                            theme={{
                                light: ['hsl(0, 0%,92%)', 'hsl(142, 71%, 45%)' ],
                                dark: ['#161b22', 'hsl(142, 71%, 45%)'],
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
