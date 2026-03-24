"use server";

import { db } from "@/lib/db";
import { boards } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBoardsByWorkspace(workspaceId: string) {
  return await db.query.boards.findMany({
    where: and(eq(boards.workspaceId, workspaceId), eq(boards.isArchived, false)),
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

export async function getBoardById(boardId: string) {
  if (!boardId) return null;

  return await db.query.boards.findFirst({
    where: eq(boards.id, boardId),
  });
}

export async function updateBoardSnapshot(boardId: string, snapshotJson: unknown) {
  if (!boardId) return;

  // Postgres driver rejects undefined in JSON payloads.
  const sanitizedSnapshot = JSON.parse(JSON.stringify(snapshotJson));

  await db
    .update(boards)
    .set({
      snapshotJson: sanitizedSnapshot,
      updatedAt: new Date(),
    })
    .where(eq(boards.id, boardId));

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/board/${boardId}`);
}

export async function deleteBoard(boardId: string) {
  await db.delete(boards).where(eq(boards.id, boardId));
  revalidatePath("/dashboard");
}

export async function updateBoardName(boardId: string, title: string) {
  if (!boardId) return;
  await db.update(boards).set({ title, updatedAt: new Date() }).where(eq(boards.id, boardId));
  revalidatePath("/dashboard");
}

export async function getArchivedBoardsByWorkspace(workspaceId: string) {
  return await db.query.boards.findMany({
    where: and(eq(boards.workspaceId, workspaceId), eq(boards.isArchived, true)),
    orderBy: [desc(boards.updatedAt)],
  });
}

export async function getRecentBoardsByWorkspace(workspaceId: string) {
  return await db.query.boards.findMany({
    where: and(eq(boards.workspaceId, workspaceId), eq(boards.isArchived, false)),
    orderBy: [desc(boards.updatedAt)],
    limit: 10,
  });
}

export async function archiveBoard(boardId: string) {
  if (!boardId) return;
  await db.update(boards).set({ isArchived: true, updatedAt: new Date() }).where(eq(boards.id, boardId));
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archive");
}

export async function unarchiveBoard(boardId: string) {
  if (!boardId) return;
  await db.update(boards).set({ isArchived: false, updatedAt: new Date() }).where(eq(boards.id, boardId));
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/archive");
}

export async function getPublicBoards() {
  // Used for the community Gallery route
  return await db.query.boards.findMany({
    where: eq(boards.isPublic, true),
    orderBy: [desc(boards.likes), desc(boards.views), desc(boards.updatedAt)],
    limit: 50,
    with: {
      creator: true, // Requires relation to resolve early. Make sure it's valid based on schema.
    }
  });
}
