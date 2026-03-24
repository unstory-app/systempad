"use client";

import React, { useState, useEffect } from "react";
import "@excalidraw/excalidraw/index.css";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

interface EmbedClientProps {
  board: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snapshotJson: any;
  };
}

export function EmbedClient({ board }: EmbedClientProps) {
  const { resolvedTheme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Excali, setExcali] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to be SSR safe
    import("@excalidraw/excalidraw").then((mod) => {
      setExcali(mod);
    });
  }, []);

  if (!Excali) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-foreground animate-spin opacity-50" />
      </div>
    );
  }

  const { Excalidraw } = Excali;

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <Excalidraw
        viewModeEnabled={true}
        zenModeEnabled={true}
        initialData={{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          elements: board.snapshotJson?.elements || [],
          appState: {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-member-access
             ...(({ collaborators, ...rest }: any) => rest)(board.snapshotJson?.appState || {}),
             theme: resolvedTheme === 'dark' ? 'dark' : 'light',
             viewBackgroundColor: resolvedTheme === 'dark' ? '#09090b' : '#ffffff',
          },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          files: board.snapshotJson?.files || {},
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}
