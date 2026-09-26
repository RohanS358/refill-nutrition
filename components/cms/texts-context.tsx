"use client";

import { createContext, useContext, type JSX, type ReactNode } from "react";

/**
 * Client-side twin of <T>. The site layout hands every text override down
 * once; client components read them here, so their labels are editable in
 * the visual editor like any server-rendered copy.
 */
const TextsContext = createContext<Record<string, string>>({});

export function TextsProvider({ texts, children }: { texts: Record<string, string>; children: ReactNode }) {
  return <TextsContext.Provider value={texts}>{children}</TextsContext.Provider>;
}

/** Resolve an editable text on the client (for attributes, placeholders…). */
export function useText(k: string, fallback: string): string {
  return useContext(TextsContext)[k] ?? fallback;
}

/** Editable text for client components — same contract as <T>. */
export function Tc({
  k,
  children,
  as = "span",
  className,
}: {
  k: string;
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const Tag = as as "span";
  return (
    <Tag data-cms={k} className={className}>
      {useText(k, children)}
    </Tag>
  );
}
