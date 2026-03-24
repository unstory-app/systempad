import { getBoardById } from "@/lib/actions/board";
import { notFound } from "next/navigation";
import { EmbedClient } from "@/components/editor/EmbedClient";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ boardId: string }> }): Promise<Metadata> {
  const { boardId } = await params;
  const board = await getBoardById(boardId);
  return {
    title: board ? `${board.title} | SystemPad Embed` : 'SystemPad Architecture',
  };
}

export default async function EmbedPage({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;
  const board = await getBoardById(boardId);

  if (!board) {
    notFound();
  }

  // Pass only the necessary data to the heavily cached client wrapper
  return (
    <div className="w-full h-screen bg-transparent">
      <EmbedClient board={board} />
    </div>
  );
}
