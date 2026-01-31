import fs from "fs";
import path from "path";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
};

const articlesDirectory = path.join(process.cwd(), "content/articles");

function parseMarkdown(fileContent: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const frontmatterLines = match[1].split("\n");
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterLines) {
    const [key, ...valueParts] = line.split(": ");
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(": ").trim();
    }
  }

  return { frontmatter, content: match[2].trim() };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { frontmatter, content } = parseMarkdown(fileContents);

      return {
        slug,
        title: frontmatter.title || slug,
        excerpt: frontmatter.excerpt || "",
        date: frontmatter.date || "",
        category: frontmatter.category || "Uncategorized",
        content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getArticles();
  return articles.filter((article) => article.category === category);
}

// For backward compatibility
export const articles = getArticles();
