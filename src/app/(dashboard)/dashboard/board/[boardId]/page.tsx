import { Canvas } from "@/components/editor/canvas";

export default async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  return (
    <div className="h-screen w-full relative">
       <Canvas boardId={boardId} />
    </div>
  );
}
