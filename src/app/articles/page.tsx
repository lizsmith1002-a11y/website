import { Container } from "@/components/ui";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights - Liz Smith",
  description: "Perspectives on board governance, leadership, and effective board service.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl mb-16">
          <p className="text-accent font-medium tracking-wide uppercase text-sm ui-text mb-4">
            Insights & Perspectives
          </p>
          <h1 className="text-4xl sm:text-5xl font-normal mb-6">Writing on Governance</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Reflections on board service, governance best practices, and lessons learned
            from the boardroom. Each piece draws from real experience to offer practical
            guidance for current and aspiring board members.
          </p>
        </div>
        <div className="max-w-3xl">
          <div className="flex flex-col gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          {articles.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              New articles coming soon. Check back for insights on board governance and leadership.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
