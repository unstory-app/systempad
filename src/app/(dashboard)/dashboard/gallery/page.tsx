import { getPublicBoards } from "@/lib/actions/board";
import { GalleryClient } from "@/components/dashboard/GalleryClient";

export default async function GalleryPage() {
  // but let's check auth anyway in case we want personalized features later.
  // const stackUser = await stackServerApp.getUser();
  
  const publicBoards = await getPublicBoards();

  return (
    <GalleryClient initialBoards={publicBoards} />
  );
}
