import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { getArticles, getArticleBySlug } from "@/lib/articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} - Board Roles`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-16">
      <Container>
        <Link
          href="/articles"
          className="text-primary hover:underline text-sm mb-6 inline-block"
        >
          &larr; Back to Articles
        </Link>
        <header className="mb-10">
          <span className="text-accent text-sm font-medium uppercase tracking-wide">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mt-2">{article.title}</h1>
          <p className="text-muted-foreground mt-4">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {article.content.split("\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
              return (
                <p key={index} className="ml-4 my-1">
                  {paragraph}
                </p>
              );
            }
            if (paragraph.trim()) {
              return (
                <p key={index} className="my-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>
      </Container>
    </article>
  );
}
