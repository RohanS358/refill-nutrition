"use client";

import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import { saveTeam } from "@/app/admin/actions";
import type { TeamMember } from "@/lib/team";
import { ImageField } from "./image-field";

const inputClass =
  "mt-1.5 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "text-eyebrow text-muted-foreground";

const emptyMember = (): TeamMember => ({
  id: "",
  index: "",
  name: "",
  role: "",
  focus: "",
});

export function TeamEditor({ initial }: { initial: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const touch = () => {
    setDirty(true);
    setSaved(false);
  };

  const update = (i: number, patch: Partial<TeamMember>) => {
    setMembers((ms) => ms.map((m, j) => (j === i ? { ...m, ...patch } : m)));
    touch();
  };

  const move = (i: number, dir: -1 | 1) => {
    setMembers((ms) => {
      const next = [...ms];
      const j = i + dir;
      if (j < 0 || j >= next.length) return ms;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    touch();
  };

  const remove = (i: number) => {
    setMembers((ms) => ms.filter((_, j) => j !== i));
    touch();
  };

  const save = () =>
    startTransition(async () => {
      await saveTeam(members);
      setDirty(false);
      setSaved(true);
    });

  return (
    <div className="mt-10">
      <div className="space-y-6">
        {members.map((member, i) => (
          <details key={i} open={member.name === ""} className="border border-border bg-card">
            <summary className="flex cursor-pointer items-center gap-4 px-5 py-4">
              <span className="text-data text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {member.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.image} alt="" className="h-10 w-10 object-cover" />
              ) : null}
              <span className="flex-1 text-sm font-semibold">
                {member.name || "New team member"}
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), move(i, -1))}
                  aria-label="Move up"
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronUp size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), move(i, 1))}
                  aria-label="Move down"
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronDown size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), remove(i))}
                  aria-label={`Delete ${member.name || "member"}`}
                  className="p-2 text-muted-foreground transition-colors hover:text-red-700"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </span>
            </summary>

            <div className="grid gap-5 border-t border-border p-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  value={member.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <input
                  value={member.role}
                  placeholder="Nutrition science"
                  onChange={(e) => update(i, { role: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Focus (one line)</label>
                <textarea
                  rows={2}
                  value={member.focus}
                  onChange={(e) => update(i, { focus: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Initials (shown without a portrait)</label>
                <input
                  value={member.initials ?? ""}
                  maxLength={3}
                  placeholder="RN"
                  onChange={(e) => update(i, { initials: e.target.value || undefined })}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <ImageField
                  label="Portrait"
                  value={member.image}
                  onChange={(url) => update(i, { image: url })}
                />
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setMembers((ms) => [...ms, emptyMember()]);
            touch();
          }}
          className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          <Plus size={16} strokeWidth={1.5} aria-hidden="true" /> Add team member
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          className="bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-50"
        >
          {pending ? "Publishing…" : "Publish changes"}
        </button>
        <p aria-live="polite" className="text-data text-muted-foreground">
          {saved ? "Published — live on the site." : dirty ? "Unsaved changes" : ""}
        </p>
      </div>
    </div>
  );
}
