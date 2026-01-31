#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@supabase/supabase-js";

// Supabase configuration - uses environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create slug
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Article operations
async function listArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, excerpt, category, date")
    .order("date", { ascending: false });

  if (error) throw new Error(`Failed to list articles: ${error.message}`);
  return data;
}

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Article not found: ${slug}`);
  return data;
}

async function createArticle(title: string, content: string, category: string, excerpt: string) {
  const slug = slugify(title);
  const date = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("articles")
    .insert({ slug, title, content, category, excerpt, date })
    .select()
    .single();

  if (error) throw new Error(`Failed to create article: ${error.message}`);
  return data;
}

async function editArticle(slug: string, updates: { title?: string; content?: string; category?: string; excerpt?: string }) {
  const updateData: Record<string, string> = {};
  if (updates.title) updateData.title = updates.title;
  if (updates.content) updateData.content = updates.content;
  if (updates.category) updateData.category = updates.category;
  if (updates.excerpt) updateData.excerpt = updates.excerpt;

  const { data, error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("slug", slug)
    .select()
    .single();

  if (error) throw new Error(`Failed to update article: ${error.message}`);
  return data;
}

async function deleteArticle(slug: string) {
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("slug", slug);

  if (error) throw new Error(`Failed to delete article: ${error.message}`);
  return { deleted: slug };
}

// Create the MCP server
const server = new Server(
  {
    name: "board-roles-mcp",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_articles",
        description: "List all articles on the website (real-time from database)",
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
            slug: { type: "string", description: "The article slug" },
          },
          required: ["slug"],
        },
      },
      {
        name: "create_article",
        description: "Create a new article (instantly visible on website)",
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
        description: "Edit an existing article (changes appear instantly)",
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
        description: "Delete an article (removed instantly from website)",
        inputSchema: {
          type: "object",
          properties: {
            slug: { type: "string", description: "The article slug to delete" },
          },
          required: ["slug"],
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
        const articles = await listArticles();
        return { content: [{ type: "text", text: JSON.stringify(articles, null, 2) }] };
      }
      case "get_article": {
        const article = await getArticle(args?.slug as string);
        return { content: [{ type: "text", text: JSON.stringify(article, null, 2) }] };
      }
      case "create_article": {
        const result = await createArticle(
          args?.title as string,
          args?.content as string,
          args?.category as string,
          args?.excerpt as string
        );
        return { content: [{ type: "text", text: `Article created successfully!\n\n${JSON.stringify(result, null, 2)}\n\nThe article is now live on the website.` }] };
      }
      case "edit_article": {
        const result = await editArticle(args?.slug as string, {
          title: args?.title as string | undefined,
          content: args?.content as string | undefined,
          category: args?.category as string | undefined,
          excerpt: args?.excerpt as string | undefined,
        });
        return { content: [{ type: "text", text: `Article updated successfully!\n\n${JSON.stringify(result, null, 2)}\n\nChanges are now live on the website.` }] };
      }
      case "delete_article": {
        const result = await deleteArticle(args?.slug as string);
        return { content: [{ type: "text", text: `Article deleted successfully!\n\n${JSON.stringify(result, null, 2)}` }] };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
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
  console.error("Board Roles MCP server (Supabase) running on stdio");
}

main().catch(console.error);
