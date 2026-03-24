import { getBoardById } from "@/lib/actions/board";
import { EditorClient } from "@/components/editor/EditorClient";
import { redirect } from "next/navigation";
import { Room } from "@/components/editor/Room";

interface PageProps {
  params: Promise<{
     boardId: string;
  }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { boardId } = await params;

  if (!boardId) {
    redirect("/dashboard");
  }

  const board = await getBoardById(boardId);

  if (!board) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-medium mb-2">Board not found</h1>
        <p className="text-muted-foreground mb-6">The board you are looking for does not exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <Room id={boardId}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <EditorClient board={board as any} />
    </Room>
  );
}
