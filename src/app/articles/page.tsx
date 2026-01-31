import { Container } from "@/components/ui";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export const metadata = {
  title: "Articles - Board Roles",
  description: "Browse all articles on board governance, leadership, and best practices.",
};

export default function ArticlesPage() {
  const articles = getArticles();
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-4">All Articles</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Explore our collection of articles covering board roles, governance best practices,
          and guidance for effective board service.
        </p>
        <div className="flex flex-col gap-6 max-w-2xl">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
