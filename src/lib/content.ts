import projectsData from "@content/projects.json";
import profileData from "@content/profile.json";
import type { Profile, Project } from "@/types/content";

const projects = projectsData as Project[];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) =>
    (b.releasedOn ?? "").localeCompare(a.releasedOn ?? ""),
  );
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProfile(): Profile {
  return profileData as Profile;
}
