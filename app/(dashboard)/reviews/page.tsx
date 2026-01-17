"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { queryKey } from "@/config/queryKey";
import { getReview } from "@/module/review/actions";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, GitPullRequest, Clock } from "lucide-react";

const ReviewsPage = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: [queryKey.REVIEWS],
    queryFn: async () => {
      return await getReview();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews History</h1>
        <p className="text-muted-foreground">
          Here are all the AI-generated reviews for your repositories
        </p>
      </div>

      {reviews?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <GitPullRequest className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No reviews yet. Connect a repository and open a PR to get
                started.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews?.map((review) => (
            <Card
              key={review.id}
              className="hover:shadow-md transition-shadow flex flex-col"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">
                  {review.prTitle}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">
                    {review.repository?.fullName || review.repository?.name}
                  </span>
                  <span>#{review.prNumber}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="bg-muted p-3 rounded-lg flex-1">
                    <pre className="whitespace-pre-wrap text-xs overflow-hidden line-clamp-6">
                      {review.review.substring(0, 300)}...
                    </pre>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={review.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
