import Link from "next/link";
import { Container } from "@/components/ui";

export function Header() {
  return (
    <header className="py-6 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="group">
            <span className="text-2xl font-normal tracking-tight text-foreground">
              Liz Smith
            </span>
            <span className="block text-xs tracking-widest uppercase text-muted-foreground mt-0.5 ui-text font-medium">
              Board Advisory
            </span>
          </Link>
          <div className="flex items-center gap-8 ui-text">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Insights
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
