"use client";

import { queryKey } from "@/config/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserProfile, updateUserProfile } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Internal form component that uses initial values from props
function ProfileFormContent({
  initialName,
  initialEmail,
}: {
  initialName: string;
  initialEmail: string;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const updateMutation = useMutation({
    mutationFn: async (data: { name?: string; email?: string }) => {
      return await updateUserProfile(data);
    },
    onSuccess: (result) => {
      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [queryKey.USER_PROFILE],
        });
        toast.success("Profile updated successfully");
      }
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate({ name, email });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={updateMutation.isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={updateMutation.isPending}
              />
            </div>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProfileForm() {
  const { data: profile, isLoading } = useQuery({
    queryKey: [queryKey.USER_PROFILE],
    queryFn: async () => await getUserProfile(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader2 className="h-5 w-5 animate-spin" />;
  }

  return (
    <ProfileFormContent
      initialName={profile?.name || ""}
      initialEmail={profile?.email || ""}
    />
  );
}
