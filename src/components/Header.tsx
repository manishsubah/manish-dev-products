import Link from "next/link";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/portfolio", label: "Portfolio" },
];

export default function Header({ name }: { name: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-semibold">
          {name}
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
