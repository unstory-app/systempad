import { ExcalidrawEditor } from "@/components/editor/excalidraw-editor";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;

  return <ExcalidrawEditor boardId={boardId} />;
}
