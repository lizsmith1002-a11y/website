import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export default function Home() {
  const articles = getArticles();
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Expert Guidance for{" "}
              <span className="text-primary">Board Members</span>
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              Discover insights on board governance, leadership roles, and best practices
              for effective board service.
            </p>
            <div className="mt-8">
              <Link href="/articles">
                <Button>Browse Articles</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/articles">
              <Button variant="secondary">View All Articles</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8">Explore by Topic</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Leadership", "Finance", "Governance", "Committees"].map((category) => (
              <Link
                key={category}
                href={`/articles?category=${category}`}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
              >
                <span className="text-lg font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
