export type Platform = "android" | "ios" | "web" | "desktop";
export type ProjectStatus = "live" | "beta" | "in-development" | "archived";

export interface ProjectLinks {
  playStore?: string;
  appStore?: string;
  apk?: string;
  web?: string;
  source?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  platforms: Platform[];
  status: ProjectStatus;
  featured?: boolean;
  icon?: string;
  screenshots?: string[];
  techStack: string[];
  features?: string[];
  links: ProjectLinks;
  releasedOn?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Profile {
  name: string;
  role: string;
  location?: string;
  bio: string;
  avatar?: string;
  resume?: string;
  email?: string;
  socials: { label: string; url: string }[];
  skills: { group: string; items: string[] }[];
  experience: Experience[];
}
