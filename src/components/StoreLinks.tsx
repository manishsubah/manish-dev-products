import type { ProjectLinks } from "@/types/content";

const linkConfig: { key: keyof ProjectLinks; label: string }[] = [
  { key: "playStore", label: "Google Play" },
  { key: "appStore", label: "App Store" },
  { key: "apk", label: "Download APK" },
  { key: "web", label: "Open web app" },
  { key: "source", label: "Source code" },
];

export default function StoreLinks({ links }: { links: ProjectLinks }) {
  const available = linkConfig.filter((l) => links[l.key]);
  if (available.length === 0) {
    return <p className="text-sm text-muted">Download links coming soon.</p>;
  }
  return (
    <div className="flex flex-wrap gap-3">
      {available.map((l) => (
        <a
          key={l.key}
          href={links[l.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-accent"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
