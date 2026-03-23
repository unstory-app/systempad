"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw, getSceneVersion } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import useSWR from "swr";
import { getBoardById, updateBoardSnapshot } from "@/lib/actions/board";
import { ExcalidrawImperativeAPI, ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import Link from "next/link";
import { ChevronLeft, Download, Share2, Save } from "lucide-react";

type ExcalidrawEditorProps = {
  boardId: string;
};

export function ExcalidrawEditor({ boardId }: ExcalidrawEditorProps) {
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const { data: board, mutate } = useSWR(`board-${boardId}`, () => getBoardById(boardId));
  const [initialData, setInitialData] = useState<ExcalidrawInitialDataState | null>(null);
  const lastSavedVersion = useRef<number | null>(null);

  useEffect(() => {
    if (!board) return;

    const appState = board.snapshotJson
      ? (board.snapshotJson as any).appState || { viewBackgroundColor: "#1a1a1a" }
      : { viewBackgroundColor: "#1a1a1a" };

    const elements = board.snapshotJson
      ? (board.snapshotJson as any).elements || []
      : [];

    const files = board.snapshotJson
      ? (board.snapshotJson as any).files || {}
      : {};

    setInitialData({
      elements,
      appState,
      files,
    });

    lastSavedVersion.current = getSceneVersion(elements);
  }, [board]);

  const saveBoard = useCallback(async () => {
    if (!excalidrawAPIRef.current || !boardId) return;

    const elements = excalidrawAPIRef.current.getSceneElements();
    const appState = excalidrawAPIRef.current.getAppState();
    const files = excalidrawAPIRef.current.getFiles();

    const currentVersion = getSceneVersion(elements);
    if (currentVersion === lastSavedVersion.current) {
      return;
    }

    const snapshot = {
      elements,
      appState: {
        viewBackgroundColor: appState.viewBackgroundColor,
        zoom: appState.zoom,
        scrollX: appState.scrollX,
        scrollY: appState.scrollY,
      },
      files,
    };

    setIsSaving(true);
    try {
      await updateBoardSnapshot(boardId, snapshot);
      setLastSavedAt(new Date());
      lastSavedVersion.current = currentVersion;
      void mutate();
    } catch (error) {
      console.error("Failed to save board snapshot", error);
    } finally {
      setIsSaving(false);
    }
  }, [boardId, mutate]);

  useEffect(() => {
    const interval = setInterval(() => {
      void saveBoard();
    }, 15000);

    return () => clearInterval(interval);
  }, [saveBoard]);

  const handleDownload = useCallback(async () => {
    if (!excalidrawAPIRef.current) return;

    const elements = excalidrawAPIRef.current.getSceneElements();
    if (elements.length === 0) return;

    try {
      // Get SVG export from Excalidraw
      const state = excalidrawAPIRef.current.getAppState();
      if (!state) return;

      // Store a simple PNG export trigger via canvas element
      const canvas = document.querySelector("[data-testid='canvas']") as HTMLCanvasElement;
      if (!canvas) return;

      const dataUrl = canvas.toDataURL?.("image/png");
      if (!dataUrl) return;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${board?.title ?? "systempad-board"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download board", error);
    }
  }, [board?.title]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1a1a1a] text-white relative">
      {/* Top Bar */}
      <div className="h-14 border-b border-[#27272A] flex items-center justify-between px-4 bg-[#121212] z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <h1 className="text-base font-bold flex-1 text-center">
          {board?.title || "Untitled Board"}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => void saveBoard()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all">
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => void handleDownload()}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all"
          >
            <Download className="w-4 h-4" />
          </button>

          {lastSavedAt ? (
            <div className="text-[11px] text-[#52525B] font-medium ml-2">
              Saved {lastSavedAt.toLocaleTimeString()}
            </div>
          ) : null}
        </div>
      </div>

      {/* Excalidraw Canvas */}
      <div className="flex-1 overflow-hidden">
        <Excalidraw
          excalidrawAPI={(api) => {
            excalidrawAPIRef.current = api;
          }}
          initialData={initialData || undefined}
          onChange={() => {
            void saveBoard();
          }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: true,
              clearCanvas: true,
              export: false,
              loadScene: true,
              saveToActiveFile: false,
              toggleTheme: true,
            },
            tools: {
              image: true,
            },
          }}
        />
      </div>
    </div>
  );
}
