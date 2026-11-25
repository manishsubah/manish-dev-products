import type { Profile } from "@/types/content";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-4">
          {profile.socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
