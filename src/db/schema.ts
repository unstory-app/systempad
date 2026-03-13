import { pgTable, text, timestamp, uuid, jsonb, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Users ---
// Using UUID for public IDs, text for emails
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Workspaces ---
export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Workspace Members ---
export const workspaceMembers = pgTable("workspace_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  role: text("role").$type<"owner" | "admin" | "member">().default("member").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => ({
  workspaceUserIdx: uniqueIndex("workspace_user_idx").on(table.workspaceId, table.userId),
}));

// --- Boards (Infinite Canvas) ---
export const boards = pgTable("boards", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  creatorId: uuid("creator_id").references(() => users.id).notNull(),
  title: text("title").notNull().default("Untitled Board"),
  isPublic: boolean("is_public").default(false).notNull(),
  
  // The big one: Binary or JSON snapshot of the canvas scene graph
  snapshotJson: jsonb("snapshot_json"),
  
  version: text("version").notNull().default("1"),
  thumbnailUrl: text("thumbnail_url"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Templates ---
export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  
  // Base snapshot to clone from
  snapshotJson: jsonb("snapshot_json").notNull(),
  
  thumbnailUrl: text("thumbnail_url"),
  isOfficial: boolean("is_official").default(false).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Relations ---

export const userRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  memberships: many(workspaceMembers),
}));

export const workspaceRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(workspaceMembers),
  boards: many(boards),
}));

export const workspaceMemberRelations = relations(workspaceMembers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceMembers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceMembers.userId],
    references: [users.id],
  }),
}));

export const boardRelations = relations(boards, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [boards.workspaceId],
    references: [workspaces.id],
  }),
  creator: one(users, {
    fields: [boards.creatorId],
    references: [users.id],
  }),
}));
