"use server";

import { db } from "@/lib/db";
import { templates } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getTemplates() {
  return await db.query.templates.findMany({
    orderBy: [desc(templates.createdAt)],
  });
}
