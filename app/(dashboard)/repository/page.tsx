"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RepositoryListSkeleton } from "@/module/repository/components/repository-skeleton";
import { useRepositories } from "@/module/repository/hooks/use-repositories";
import { Eye, Search, Star, StarIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    topics: string[];
    isConnected?: boolean;
}

const RepositoryPage = () => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useRepositories();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [localConnectingId, setLocalConnectingId] = React.useState<
        number | null
    >(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    const allRepositories = data?.pages?.flatMap((page) => page);
    const filteredRepositories = allRepositories?.filter(
        (repo: Repository) =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleConnect = async (repo: Repository) => {
        setLocalConnectingId(repo.id);
    };


    // implementing the infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
                <p className="text-muted-foreground">Manage and view all your GitHub repositories</p>
            </div>
            <RepositoryListSkeleton />
        </div>
    }

    if (isError) {
        return <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
                <p className="text-muted-foreground">Manage and view all your GitHub repositories</p>
            </div>
            <p className="text-red-500">Failed to load the repositories</p>
        </div> 
    }

    return (
        <div className="space-y-4 ">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
                <p className="text-muted-foreground">Manage and view all your Github repositories</p>
            </div>
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search repositories"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </div>
            <div className="grid gap-4">
                {filteredRepositories?.map((repo: Repository) => {
                    return (
                        <Card key={repo.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg">{repo.name}</CardTitle>
                                            <Badge variant="outline">
                                                {repo.language || "Unknown"}
                                            </Badge>
                                            {repo.isConnected && (
                                                <Badge variant="outline">Connected</Badge>
                                            )}
                                        </div>
                                        <CardDescription>{repo.description}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link
                                                href={`${repo.html_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            onClick={() => handleConnect(repo)}
                                            disabled={
                                                repo.isConnected || localConnectingId === repo.id
                                            }
                                            variant={
                                                repo.isConnected || localConnectingId === repo.id
                                                    ? "outline"
                                                    : "default"
                                            }
                                        >
                                            {localConnectingId === repo.id
                                                ? "Connecting..."
                                                : repo.isConnected
                                                    ? "Connected"
                                                    : "Connect"}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <p className="flex gap-2 items-center">
                                        <StarIcon className="h-4 w-4" />
                                        {repo.stargazers_count}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    );
                })}

                {/* infinite scroll */}
                <div ref={observerTarget} className="">
                    {isFetchingNextPage && <RepositoryListSkeleton />}
                    {!hasNextPage && (allRepositories?.length ?? 0) > 0 && (
                        <p className="text-center text-muted-foreground">
                            No more repositories
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepositoryPage;
