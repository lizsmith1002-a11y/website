import Link from "next/link";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border py-16 mt-auto bg-subtle">
      <Container>
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-normal text-foreground">Liz Smith</span>
              <span className="block text-xs tracking-widest uppercase text-muted-foreground mt-1 ui-text">
                Non Executive Director
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sharing insights on governance, leadership, and the art of effective board service.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-4 ui-text text-sm tracking-wide uppercase">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-4 ui-text text-sm tracking-wide uppercase">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@lizsmith.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm ui-text">
            &copy; {new Date().getFullYear()} Liz Smith. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground ui-text">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
