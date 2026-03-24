"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useTheme } from "next-themes";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface DocumentEditorProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
}

export function DocumentEditor({ value, onChange, title, onTitleChange }: DocumentEditorProps) {
  const { resolvedTheme } = useTheme();
  // We need to mount MDEditor only on client to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex flex-col pt-16 px-8 lg:px-12 pb-12 overflow-y-auto" data-color-mode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
       <div className="max-w-4xl mx-auto w-full h-full flex flex-col gap-6">
          <input 
            className="text-4xl font-display font-medium tracking-tight bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/30" 
            placeholder="Untitled Document" 
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          
          <div className="flex-1 w-full prose-editor-wrapper">
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || "")}
              preview="edit"
              hideToolbar={false}
              height="100%"
              className="bg-transparent! border-none! shadow-none!"
              textareaProps={{
                 placeholder: "Write system documentation, architecture notes, or deployment specs... (Supports Notion-style Markdown)"
              }}
            />
          </div>
       </div>
    </div>
  );
}
