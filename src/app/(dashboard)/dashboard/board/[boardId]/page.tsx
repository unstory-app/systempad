import { Canvas } from "@/components/editor/canvas";

export default function BoardPage({ params }: { params: { boardId: string } }) {
  return (
    <div className="h-screen w-full relative">
       <Canvas />
    </div>
  );
}
