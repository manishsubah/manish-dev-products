import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformBadges from "@/components/PlatformBadges";
import StoreLinks from "@/components/StoreLinks";
import { getAllProjects, getProject } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

// Pre-build one page per project (required for static export).
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="space-y-10">
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← All projects
      </Link>

      <header className="flex items-start gap-5">
        {project.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.icon} alt="" className="h-20 w-20 rounded-2xl border border-border" />
        )}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-lg text-muted">{project.tagline}</p>
          <PlatformBadges platforms={project.platforms} status={project.status} />
        </div>
      </header>

      <StoreLinks links={project.links} />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="leading-relaxed">{project.description}</p>
      </section>

      {project.features && project.features.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="list-inside list-disc space-y-1">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Screenshots</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {project.screenshots.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="h-96 rounded-xl border border-border" />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-md border border-border px-2 py-1 text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
