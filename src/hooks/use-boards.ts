"use client";

import useSWR from "swr";
import { getBoardsByWorkspace } from "@/lib/actions/board";

export function useBoards(workspaceId: string | undefined) {
  const { data, error, mutate, isLoading } = useSWR(
    workspaceId ? [`boards`, workspaceId] : null,
    ([_, id]) => getBoardsByWorkspace(id),
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    boards: data,
    isLoading,
    isError: error,
    mutate,
  };
}
