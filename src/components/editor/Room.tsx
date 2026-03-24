"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader2 } from "lucide-react";

export function Room({ 
  id, 
  children 
}: { 
  id: string; 
  children: ReactNode;
}) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={id} initialPresence={{ cursor: null, button: "up" }}>
        <ClientSideSuspense fallback={
          <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium tracking-tight">
               Connecting to Secure Collaborative Session...
            </p>
          </div>
        }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
