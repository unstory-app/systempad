// liveblocks.config.ts
import { createClient } from "@liveblocks/client";

// This is required for @liveblocks/react and @liveblocks/react-ui
export const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// Typing for your Liveblocks presence, storage, etc.
declare global {
  interface Liveblocks {
    // Custom user info set in the auth endpoint
    UserMeta: {
      id: string; // The user ID 
      info: {
        name: string;
        email: string;
        avatar: string;
      };
    };
    
    // Custom presence properties (e.g. tracking Excalidraw live cursors and mouse buttons)
    Presence: {
      cursor: { x: number; y: number } | null;
      button: "up" | "down";
    };
    
    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: Record<string, never>;
    
    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: Record<string, never>;

    // Custom room info set in the resolveRoomsInfo hook
    RoomInfo: Record<string, never>;
  }
}
