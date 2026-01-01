import Link from "next/link";
import { Card } from "@/components/ui";
import type { Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <Link href={`/articles/${article.slug}`}>
        <span className="text-xs font-medium text-accent uppercase tracking-wide">
          {article.category}
        </span>
        <h3 className="text-xl font-semibold mt-2 text-card-foreground">
          {article.title}
        </h3>
        <p className="text-muted-foreground mt-3 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </Link>
    </Card>
  );
}
