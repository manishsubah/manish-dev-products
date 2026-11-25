import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects, getProfile } from "@/lib/content";

export default function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-16">
      <section className="space-y-4 pt-6">
        <p className="text-sm font-medium text-accent">{profile.role}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hi, I&apos;m {profile.name}.
        </h1>
        <p className="max-w-2xl text-lg text-muted">{profile.bio}</p>
        <div className="flex gap-3 pt-2">
          <Link href="/projects" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
            See my projects
          </Link>
          <Link href="/portfolio" className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
            Portfolio
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured projects</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
