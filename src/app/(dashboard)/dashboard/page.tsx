import { stackServerApp } from "@/stack/server";
import { syncUser } from "@/lib/actions/user";
import { getBoardsByWorkspace } from "@/lib/actions/board";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const stackUser = await stackServerApp.getUser();
  
  if (!stackUser) {
    redirect(stackServerApp.urls.signIn);
  }

  // Sync user with our database server-side
  const dbUser = await syncUser(stackUser);
  
  if (!dbUser || !dbUser.workspaces?.[0]?.id) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Error loading workspace. Please try again.</p>
      </div>
    );
  }

  const workspaceId = dbUser.workspaces[0].id;
  const initialBoards = await getBoardsByWorkspace(workspaceId);

  return (
    <DashboardClient 
      initialBoards={initialBoards} 
      workspaceId={workspaceId} 
      userId={dbUser.id} 
    />
  );
}
