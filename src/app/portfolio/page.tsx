import type { Metadata } from "next";
import { getAllProjects, getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  const profile = getProfile();
  const projectCount = getAllProjects().length;

  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-accent">{profile.role}</p>
        {profile.location && <p className="text-sm text-muted">{profile.location}</p>}
        <p className="max-w-2xl leading-relaxed">{profile.bio}</p>
        <p className="text-sm text-muted">{projectCount} projects shipped or in progress</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {profile.resume && (
            <a href={profile.resume} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              Download resume
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
              Email me
            </a>
          )}
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.skills.map((group) => (
            <div key={group.group} className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-medium">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span key={s} className="rounded-md bg-background px-2 py-1 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <ol className="space-y-6 border-l border-border pl-5">
          {profile.experience.map((e) => (
            <li key={`${e.company}-${e.role}`} className="space-y-1">
              <p className="font-medium">
                {e.role} · {e.company}
              </p>
              <p className="text-sm text-muted">{e.period}</p>
              <p>{e.summary}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
