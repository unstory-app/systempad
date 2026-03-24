import { stackServerApp } from "@/stack/server";
import { syncUser } from "@/lib/actions/user";
import { getRecentBoardsByWorkspace } from "@/lib/actions/board";
import { RecentClient } from "@/components/dashboard/RecentClient";
import { redirect } from "next/navigation";

export default async function RecentPage() {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(stackServerApp.urls.signIn);
  }

  const dbUser = await syncUser(stackUser);
  if (!dbUser || !dbUser.workspaces?.[0]?.id) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Workspace not found.</p>
      </div>
    );
  }

  const workspaceId = dbUser.workspaces[0].id;
  const initialBoards = await getRecentBoardsByWorkspace(workspaceId);

  return (
    <RecentClient 
      initialBoards={initialBoards} 
      workspaceId={workspaceId}
      userId={dbUser.id}
    />
  );
}
