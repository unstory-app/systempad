import { stackServerApp } from "@/stack/server";
import { getTemplates } from "@/lib/actions/template";
import { TemplatesClient } from "@/components/dashboard/TemplatesClient";
import { redirect } from "next/navigation";

export default async function TemplatesPage() {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(stackServerApp.urls.signIn);
  }

  const initialTemplates = await getTemplates();

  return (
    <TemplatesClient 
      initialTemplates={initialTemplates} 
    />
  );
}
