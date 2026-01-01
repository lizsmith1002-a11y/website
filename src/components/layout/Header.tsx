import Link from "next/link";
import { Container } from "@/components/ui";

export function Header() {
  return (
    <header className="border-b border-border py-4">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            Board Roles
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/articles" className="hover:text-primary transition-colors">
              Articles
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
