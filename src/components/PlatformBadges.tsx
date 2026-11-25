import type { Platform, ProjectStatus } from "@/types/content";

const platformLabel: Record<Platform, string> = {
  android: "Android",
  ios: "iOS",
  web: "Web",
  desktop: "Desktop",
};

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In development",
  archived: "Archived",
};

export default function PlatformBadges({
  platforms,
  status,
}: {
  platforms: Platform[];
  status: ProjectStatus;
}) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {platforms.map((p) => (
        <span key={p} className="rounded-full border border-border px-2 py-0.5">
          {platformLabel[p]}
        </span>
      ))}
      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">{statusLabel[status]}</span>
    </div>
  );
}
