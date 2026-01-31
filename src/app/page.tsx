import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-medium tracking-wide uppercase text-sm ui-text mb-4">
              Board Governance & Leadership
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Navigating the boardroom with clarity and confidence
            </h1>
            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-2xl">
              Drawing from years of experience across nonprofit and corporate boards,
              I share practical insights on governance, fiduciary duty, and the art
              of effective board leadership.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 ui-text">
              <Link href="/articles">
                <Button>Read My Insights</Button>
              </Link>
              <Link href="#about">
                <Button variant="outline">About My Work</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Featured Articles */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <p className="text-accent font-medium tracking-wide uppercase text-sm ui-text mb-2">
                Latest Writing
              </p>
              <h2 className="text-3xl font-normal">Recent Insights</h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-primary hover:text-primary-dark ui-text transition-colors"
            >
              View all articles →
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-subtle">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium tracking-wide uppercase text-sm ui-text mb-4">
              About
            </p>
            <h2 className="text-3xl font-normal mb-6">A Commitment to Good Governance</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              With experience serving on boards across sectors, I&apos;ve developed a deep
              appreciation for the nuances of effective governance. This site is where I
              share lessons learned, explore emerging best practices, and offer perspectives
              on the evolving responsibilities of board service.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-normal text-primary">15+</p>
                <p className="text-sm text-muted-foreground ui-text mt-1">Years Experience</p>
              </div>
              <div className="border-l border-border" />
              <div>
                <p className="text-3xl font-normal text-primary">8</p>
                <p className="text-sm text-muted-foreground ui-text mt-1">Board Positions</p>
              </div>
              <div className="border-l border-border" />
              <div>
                <p className="text-3xl font-normal text-primary">3</p>
                <p className="text-sm text-muted-foreground ui-text mt-1">Sectors</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-wide uppercase text-sm ui-text mb-2">
              Areas of Focus
            </p>
            <h2 className="text-3xl font-normal">Topics I Write About</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Governance", desc: "Best practices & frameworks" },
              { name: "Leadership", desc: "Board dynamics & culture" },
              { name: "Finance", desc: "Fiduciary responsibilities" },
              { name: "Strategy", desc: "Long-term planning" },
            ].map((topic) => (
              <Link
                key={topic.name}
                href={`/articles?category=${topic.name}`}
                className="group p-8 border border-border rounded-lg hover:border-primary hover:bg-subtle transition-all"
              >
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-muted-foreground">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-normal mb-4">Let&apos;s Connect</h2>
            <p className="text-primary-light text-lg mb-8">
              Interested in discussing board governance or exploring how we might work together?
              I&apos;d love to hear from you.
            </p>
            <a
              href="mailto:hello@lizsmith.com"
              className="inline-block px-8 py-3 bg-white text-primary font-medium rounded hover:bg-gray-100 transition-colors ui-text"
            >
              Get in Touch
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
