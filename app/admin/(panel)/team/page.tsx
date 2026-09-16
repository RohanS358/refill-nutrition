import { collection } from "@/lib/cms/content";
import { team } from "@/lib/team";
import { TeamEditor } from "@/components/cms/team-editor";

export default async function AdminTeamPage() {
  const members = await collection("team", team);

  return (
    <div className="mx-auto max-w-4xl px-8 py-12 lg:px-12">
      <p className="text-eyebrow text-primary">Team</p>
      <h1 className="text-display mt-4">Our team.</h1>
      <p className="text-lead mt-4 max-w-2xl text-muted-foreground">
        The people shown on the home page. Add portraits (PNG, JPG or WebP, max
        2 MB) or leave them off — members without one fall back to initials.
      </p>
      <TeamEditor initial={members} />
    </div>
  );
}
