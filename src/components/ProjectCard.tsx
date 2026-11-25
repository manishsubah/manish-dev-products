import Link from "next/link";
import PlatformBadges from "@/components/PlatformBadges";
import type { Project } from "@/types/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition hover:border-accent"
    >
      <div className="flex items-center gap-3">
        {project.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.icon} alt="" className="h-12 w-12 rounded-xl" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-lg font-bold text-accent">
            {project.name.charAt(0)}
          </div>
        )}
        <h3 className="font-semibold group-hover:text-accent">{project.name}</h3>
      </div>
      <p className="flex-1 text-sm text-muted">{project.tagline}</p>
      <PlatformBadges platforms={project.platforms} status={project.status} />
    </Link>
  );
}
