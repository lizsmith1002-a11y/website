import Link from "next/link";
import type { Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="border-t border-border pt-6 group-hover:border-primary transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-accent uppercase tracking-wider ui-text">
              {article.category}
            </span>
            <span className="text-muted-foreground">·</span>
            <time className="text-xs text-muted-foreground ui-text">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h3 className="text-xl font-normal text-card-foreground group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
          <span className="inline-block mt-4 text-sm font-medium text-primary ui-text group-hover:underline">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}
