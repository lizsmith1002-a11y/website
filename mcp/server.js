#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
// Path to the website content
const WEBSITE_ROOT = path.resolve(process.env.WEBSITE_ROOT || path.join(__dirname, ".."));
const ARTICLES_DIR = path.join(WEBSITE_ROOT, "content/articles");
const CONFIG_FILE = path.join(WEBSITE_ROOT, "content/site-config.json");
const THEME_FILE = path.join(WEBSITE_ROOT, "src/app/globals.css");
// Helper functions
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
function readConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    }
    return {};
}
function writeConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
function listArticles() {
    ensureDir(ARTICLES_DIR);
    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
    return files.map((file) => {
        const content = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const frontmatter = {};
        if (frontmatterMatch) {
            frontmatterMatch[1].split("\n").forEach((line) => {
                const [key, ...val] = line.split(": ");
                if (key)
                    frontmatter[key.trim()] = val.join(": ").trim();
            });
        }
        return {
            slug: file.replace(".md", ""),
            title: frontmatter.title || file,
            date: frontmatter.date || "",
            category: frontmatter.category || "Uncategorized",
            excerpt: frontmatter.excerpt || "",
        };
    });
}
function createArticle(title, content, category, excerpt) {
    ensureDir(ARTICLES_DIR);
    const slug = slugify(title);
    const date = new Date().toISOString().split("T")[0];
    const markdown = `---
title: ${title}
excerpt: ${excerpt}
date: ${date}
category: ${category}
---

${content}
`;
    fs.writeFileSync(path.join(ARTICLES_DIR, `${slug}.md`), markdown);
    return { slug, title, date, category };
}
function editArticle(slug, updates) {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Article not found: ${slug}`);
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
        throw new Error("Invalid article format");
    }
    const frontmatter = {};
    frontmatterMatch[1].split("\n").forEach((line) => {
        const [key, ...val] = line.split(": ");
        if (key)
            frontmatter[key.trim()] = val.join(": ").trim();
    });
    const existingContent = frontmatterMatch[2].trim();
    const newFrontmatter = {
        title: updates.title || frontmatter.title,
        excerpt: updates.excerpt || frontmatter.excerpt,
        date: frontmatter.date,
        category: updates.category || frontmatter.category,
    };
    const newContent = updates.content !== undefined ? updates.content : existingContent;
    const markdown = `---
title: ${newFrontmatter.title}
excerpt: ${newFrontmatter.excerpt}
date: ${newFrontmatter.date}
category: ${newFrontmatter.category}
---

${newContent}
`;
    fs.writeFileSync(filePath, markdown);
    return { slug, ...newFrontmatter };
}
function deleteArticle(slug) {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Article not found: ${slug}`);
    }
    fs.unlinkSync(filePath);
    return { deleted: slug };
}
function getArticle(slug) {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Article not found: ${slug}`);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return { slug, content };
}
function updateTheme(colors) {
    if (!fs.existsSync(THEME_FILE)) {
        throw new Error("Theme file not found");
    }
    let css = fs.readFileSync(THEME_FILE, "utf-8");
    if (colors.primary) {
        css = css.replace(/(--primary:\s*)#[0-9a-fA-F]{6}/g, `$1${colors.primary}`);
    }
    if (colors.accent) {
        css = css.replace(/(--accent:\s*)#[0-9a-fA-F]{6}/g, `$1${colors.accent}`);
    }
    fs.writeFileSync(THEME_FILE, css);
    return { updated: true, colors };
}
function publishChanges(commitMessage) {
    try {
        execSync("git add .", { cwd: WEBSITE_ROOT });
        execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { cwd: WEBSITE_ROOT });
        execSync("git push", { cwd: WEBSITE_ROOT });
        return { success: true, message: "Changes published successfully" };
    }
    catch (error) {
        return { success: false, message: `Failed to publish: ${error}` };
    }
}
// Create the MCP server
const server = new Server({
    name: "board-roles-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "list_articles",
                description: "List all articles on the website",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "get_article",
                description: "Get the full content of a specific article",
                inputSchema: {
                    type: "object",
                    properties: {
                        slug: { type: "string", description: "The article slug (filename without .md)" },
                    },
                    required: ["slug"],
                },
            },
            {
                name: "create_article",
                description: "Create a new article on the website",
                inputSchema: {
                    type: "object",
                    properties: {
                        title: { type: "string", description: "The article title" },
                        content: { type: "string", description: "The article content in markdown" },
                        category: { type: "string", description: "The article category" },
                        excerpt: { type: "string", description: "A short excerpt/summary of the article" },
                    },
                    required: ["title", "content", "category", "excerpt"],
                },
            },
            {
                name: "edit_article",
                description: "Edit an existing article",
                inputSchema: {
                    type: "object",
                    properties: {
                        slug: { type: "string", description: "The article slug to edit" },
                        title: { type: "string", description: "New title (optional)" },
                        content: { type: "string", description: "New content (optional)" },
                        category: { type: "string", description: "New category (optional)" },
                        excerpt: { type: "string", description: "New excerpt (optional)" },
                    },
                    required: ["slug"],
                },
            },
            {
                name: "delete_article",
                description: "Delete an article from the website",
                inputSchema: {
                    type: "object",
                    properties: {
                        slug: { type: "string", description: "The article slug to delete" },
                    },
                    required: ["slug"],
                },
            },
            {
                name: "update_theme",
                description: "Update the website theme colors",
                inputSchema: {
                    type: "object",
                    properties: {
                        primary: { type: "string", description: "Primary color hex code (e.g., #1e40af)" },
                        accent: { type: "string", description: "Accent color hex code (e.g., #0891b2)" },
                    },
                },
            },
            {
                name: "get_site_config",
                description: "Get the current site configuration",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "update_site_config",
                description: "Update site configuration (name, description, etc.)",
                inputSchema: {
                    type: "object",
                    properties: {
                        siteName: { type: "string", description: "The site name" },
                        siteDescription: { type: "string", description: "The site description" },
                        heroTitle: { type: "string", description: "Homepage hero title" },
                        heroDescription: { type: "string", description: "Homepage hero description" },
                    },
                },
            },
            {
                name: "publish_changes",
                description: "Commit and push all changes to deploy the website",
                inputSchema: {
                    type: "object",
                    properties: {
                        message: { type: "string", description: "Commit message describing the changes" },
                    },
                    required: ["message"],
                },
            },
        ],
    };
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "list_articles": {
                const articles = listArticles();
                return { content: [{ type: "text", text: JSON.stringify(articles, null, 2) }] };
            }
            case "get_article": {
                const article = getArticle(args?.slug);
                return { content: [{ type: "text", text: JSON.stringify(article, null, 2) }] };
            }
            case "create_article": {
                const result = createArticle(args?.title, args?.content, args?.category, args?.excerpt);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
            case "edit_article": {
                const result = editArticle(args?.slug, {
                    title: args?.title,
                    content: args?.content,
                    category: args?.category,
                    excerpt: args?.excerpt,
                });
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
            case "delete_article": {
                const result = deleteArticle(args?.slug);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
            case "update_theme": {
                const result = updateTheme({
                    primary: args?.primary,
                    accent: args?.accent,
                });
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
            case "get_site_config": {
                const config = readConfig();
                return { content: [{ type: "text", text: JSON.stringify(config, null, 2) }] };
            }
            case "update_site_config": {
                const config = readConfig();
                if (args?.siteName)
                    config.siteName = args.siteName;
                if (args?.siteDescription)
                    config.siteDescription = args.siteDescription;
                if (args?.heroTitle)
                    config.homepage.heroTitle = args.heroTitle;
                if (args?.heroDescription)
                    config.homepage.heroDescription = args.heroDescription;
                writeConfig(config);
                return { content: [{ type: "text", text: JSON.stringify(config, null, 2) }] };
            }
            case "publish_changes": {
                const result = publishChanges(args?.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Board Roles MCP server running on stdio");
}
main().catch(console.error);
