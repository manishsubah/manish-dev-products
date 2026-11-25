import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/content";
import "./globals.css";

const profile = getProfile();

export const metadata: Metadata = {
  title: { default: `${profile.name} — Projects & Portfolio`, template: `%s · ${profile.name}` },
  description: profile.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Header name={profile.name} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
