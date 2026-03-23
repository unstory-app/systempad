"use server";

import { db } from "@/lib/db";
import { boards, workspaces } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBoardsByWorkspace(workspaceId: string) {
  return await db.query.boards.findMany({
    where: eq(boards.workspaceId, workspaceId),
    orderBy: [desc(boards.updatedAt)],
  });
}

export async function createBoard(workspaceId: string, creatorId: string, title: string = "Untitled Board") {
  const [newBoard] = await db.insert(boards).values({
    workspaceId,
    creatorId,
    title,
  }).returning();
  
  revalidatePath("/dashboard");
  return newBoard;
}

export async function deleteBoard(boardId: string) {
  await db.delete(boards).where(eq(boards.id, boardId));
  revalidatePath("/dashboard");
}
