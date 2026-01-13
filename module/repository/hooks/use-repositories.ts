"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRepositories } from "../actions";
import { queryKey } from "@/config/queryKey";

export const useRepositories = () => {
  return useInfiniteQuery({
    queryKey: [queryKey.REPOSITORIES],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchRepositories(pageParam, 10);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
