"use server";

import { db } from "@/lib/db";
import { users, workspaces, workspaceMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function syncUser(stackUser: any) {
  if (!stackUser) return null;

  // 1. Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, stackUser.primaryEmail),
    with: {
      workspaces: true,
    },
  });

  if (existingUser) {
    if (existingUser.workspaces.length === 0) {
      // Backfill a default workspace for legacy users without one.
      const [workspace] = await db.insert(workspaces).values({
        name: "My Workspace",
        slug: `ws-${existingUser.id.toString().slice(0, 8)}`,
        ownerId: existingUser.id,
      }).returning();

      await db.insert(workspaceMembers).values({
        workspaceId: workspace.id,
        userId: existingUser.id,
        role: "owner",
      });

      return await db.query.users.findFirst({
        where: eq(users.id, existingUser.id),
        with: {
          workspaces: true,
        },
      });
    }

    return existingUser;
  }

  // 2. Create user if not exists
  const [newUser] = await db.insert(users).values({
    email: stackUser.primaryEmail,
    name: stackUser.displayName || stackUser.primaryEmail.split("@")[0],
    avatarUrl: stackUser.profileImageUrl,
  }).returning();

  // 3. Create a default workspace for the new user
  const [newWorkspace] = await db.insert(workspaces).values({
    name: "My Workspace",
    slug: `ws-${newUser.id.toString().slice(0, 8)}`,
    ownerId: newUser.id,
  }).returning();

  // 4. Add user as owner in workspace_members
  await db.insert(workspaceMembers).values({
    workspaceId: newWorkspace.id,
    userId: newUser.id,
    role: "owner",
  });

  return await db.query.users.findFirst({
    where: eq(users.id, newUser.id),
    with: {
      workspaces: true,
    },
  });
}

export async function getCurrentUser(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      workspaces: true,
    }
  });
}
