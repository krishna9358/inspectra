"use client";

import { queryKey } from "@/config/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { disconnectAllRepository, disconnectRepository, getConnectRepositories } from "../actions";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function RepositoryList() {

    const queryClient = useQueryClient();
    const [disconnectAllOpen, setDisconnectAllOpen] = useState(false);

    const { data: repositories, isLoading } = useQuery({
        queryKey: [queryKey.USER_REPOS],
        queryFn: async () => await getConnectRepositories(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })


    const disconnecteMutation = useMutation({
        mutationFn: async (repositoryId: string) => {
            return await disconnectRepository(repositoryId)
        },
        onSuccess: (result) => {
            if (result?.success) {
                queryClient.invalidateQueries({ queryKey: [queryKey.USER_REPOS] });
                queryClient.invalidateQueries({
                    queryKey: [queryKey.DASHBOARD_STATS]
                })
            }
            else {
                toast.error("Failed to disconnect repository")
            }
        },

    })

    const disconnectAllMutation = useMutation({
        mutationFn: async () => {
            return await disconnectAllRepository()
        },
        onSuccess: (result) => {
            if (result?.success) {
                queryClient.invalidateQueries({ queryKey: [queryKey.USER_REPOS] });
                queryClient.invalidateQueries({
                    queryKey: [queryKey.DASHBOARD_STATS]
                })
            }
            else {
                toast.error("Failed to disconnect repository")
            }
        },

    })


    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Connected Repositories</CardTitle>
                    <CardDescription>Manage your connected repositories</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        <div className="h-20 rounded bg-muted"></div>
                        <div className="h-20 rounded bg-muted"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Connected Repositories</CardTitle>
                        <CardDescription>Manage your connected GitHub repositories</CardDescription>
                    </ div>
                    {repositories && repositories.length > 0 && (
                        <AlertDialog open={disconnectAllOpen} onOpenChange={setDisconnectAllOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Disconnect All
                                </Button>
                            </AlertDialogTrigger>
                            < AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-destructive" />
                                        Disconnect All Repositories?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will disconnect all {repositories?.length} repositories and delete all associated AI reviews.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => disconnectAllMutation.mutate()}
                                        className="bg-destructive text-destructive-foreground
hover: bg-destructive/90"
                                        disabled={disconnectAllMutation.isPending}>
                                        {disconnectAllMutation.isPending ? "Disconnecting..." : "Disconnect All"}
                                    </ AlertDialogAction>
                                </ AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                (!repositories || repositories. length === 0 ? [ <div className="text-center py-8 text-muted-foreground"> <p>No repositories connected yet.</p>
                    <p className="text-sm mt-2">Connect repositories from the Repository page.</p>
                </div>
                : (<div className="space-y-4"> {repositories?.map((repo) =>
                    <div
                        key={repo.id}
                        className="flex items-center justify-between p-4 border rounded-1g
hover: bg-muted/50 transition-colors">
                        <div className="flex-1 min-w-Ø">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate">{repo.fullName}</h3>
                                <a href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover: text-foreground">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    disabled={disconnecteMutation.isPending}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {disconnecteMutation.isPending ? "Disconnecting..." : "Disconnect"}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Disconnect Repository?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to disconnect <span className="font-semibold">{repo.fullName}</span>? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => disconnecteMutation.mutate(repo.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Disconnect
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
                </div>)



            </CardContent>
        </Card >
    );
}