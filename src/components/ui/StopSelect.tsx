"use client";

import * as React from "react";
import type { Stop } from "@/lib/types";
import { cn } from "@/lib/utils";

/** A searchable stop picker (native datalist-free, lightweight combobox). */
export function StopSelect({
  stops,
  value,
  onChange,
  placeholder,
  exclude,
}: {
  stops: Stop[];
  value: string | null;
  onChange: (id: string | null) => void;
  placeholder: string;
  exclude?: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = stops.find((s) => s.id === value) ?? null;
  const list = stops
    .filter((s) => s.id !== exclude)
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-input bg-card px-3 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={cn(selected ? "text-foreground" : "text-muted-foreground")}>
          {selected ? selected.name : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-[1100] mt-1 w-full overflow-hidden rounded-lg border border-border bg-card shadow-panel">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search stops…"
            className="w-full border-b border-border px-3 py-2 text-sm focus:outline-none"
          />
          <div className="max-h-60 overflow-y-auto py-1">
            {list.length === 0 && (
              <p className="px-3 py-2 text-sm text-muted-foreground">No stops found</p>
            )}
            {list.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onChange(s.id);
                  setOpen(false);
                  setQuery("");
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-sm hover:bg-muted",
                  s.id === value && "bg-brand-50 font-medium text-brand-700"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
