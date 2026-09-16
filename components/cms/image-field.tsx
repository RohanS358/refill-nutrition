"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/app/admin/actions";

/**
 * Image picker for the admin: uploads to public/uploads and hands the
 * resulting public URL back. Accepts PNG/JPG/WebP up to 2 MB (enforced
 * again on the server, which also sniffs the magic number).
 */
export function ImageField({
  value,
  onChange,
  label = "Product image",
}: {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (file: File | undefined) => {
    if (!file) return;
    setError(null);
    // Fail fast in the browser; the server re-checks.
    if (file.size > 2 * 1024 * 1024) {
      setError(`Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 2 MB.`);
      return;
    }
    const data = new FormData();
    data.set("file", file);
    startTransition(async () => {
      const result = await uploadImage(data);
      if (result.ok) onChange(result.url);
      else setError(result.error);
    });
  };

  return (
    <div>
      <label className="text-eyebrow text-muted-foreground">{label}</label>
      <div className="mt-1.5 flex items-start gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-border bg-secondary">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary
            // uploaded paths, no need for the optimizer in the admin.
            <img src={value} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-data text-muted-foreground">None</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => pick(e.target.files?.[0])}
            className="sr-only"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={pending}
              className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm transition-colors hover:border-primary disabled:opacity-50"
            >
              <Upload size={14} strokeWidth={1.5} aria-hidden="true" />
              {pending ? "Uploading…" : value ? "Replace" : "Upload"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                  setError(null);
                }}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-red-700"
              >
                <X size={14} strokeWidth={1.5} aria-hidden="true" />
                Remove
              </button>
            ) : null}
          </div>

          <input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || undefined)}
            placeholder="/products/example.webp"
            className="mt-2 w-full border border-border bg-card px-3 py-2 text-xs outline-none focus:border-primary"
          />
          <p className="text-data mt-1.5 text-muted-foreground">
            PNG, JPG or WebP · max 2 MB. Transparent PNG works best.
          </p>
          {error ? <p className="text-data mt-1.5 text-red-700">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
