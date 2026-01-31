import { createClient } from "@supabase/supabase-js";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

// Helper function to create slug
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    // MCP endpoints
    if (url.pathname === "/mcp" && request.method === "POST") {
      const body = await request.json() as { method: string; params?: Record<string, unknown> };
      const { method, params } = body;

      try {
        let result: unknown;

        switch (method) {
          case "tools/list": {
            result = {
              tools: [
                {
                  name: "list_articles",
                  description: "List all articles on the Board Roles website",
                  inputSchema: { type: "object", properties: {} },
                },
                {
                  name: "get_article",
                  description: "Get a specific article by slug",
                  inputSchema: {
                    type: "object",
                    properties: { slug: { type: "string" } },
                    required: ["slug"],
                  },
                },
                {
                  name: "create_article",
                  description: "Create a new article (appears instantly on website)",
                  inputSchema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      content: { type: "string" },
                      category: { type: "string" },
                      excerpt: { type: "string" },
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
                      slug: { type: "string" },
                      title: { type: "string" },
                      content: { type: "string" },
                      category: { type: "string" },
                      excerpt: { type: "string" },
                    },
                    required: ["slug"],
                  },
                },
                {
                  name: "delete_article",
                  description: "Delete an article",
                  inputSchema: {
                    type: "object",
                    properties: { slug: { type: "string" } },
                    required: ["slug"],
                  },
                },
              ],
            };
            break;
          }

          case "tools/call": {
            const toolParams = params as { name: string; arguments?: Record<string, string> };
            const toolName = toolParams.name;
            const args = toolParams.arguments || {};

            switch (toolName) {
              case "list_articles": {
                const { data, error } = await supabase
                  .from("articles")
                  .select("slug, title, excerpt, category, date")
                  .order("date", { ascending: false });
                if (error) throw new Error(error.message);
                result = { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                break;
              }

              case "get_article": {
                const { data, error } = await supabase
                  .from("articles")
                  .select("*")
                  .eq("slug", args.slug)
                  .single();
                if (error) throw new Error(`Article not found: ${args.slug}`);
                result = { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                break;
              }

              case "create_article": {
                const slug = slugify(args.title);
                const date = new Date().toISOString().split("T")[0];
                const { data, error } = await supabase
                  .from("articles")
                  .insert({ slug, title: args.title, content: args.content, category: args.category, excerpt: args.excerpt, date })
                  .select()
                  .single();
                if (error) throw new Error(error.message);
                result = { content: [{ type: "text", text: `Article created!\n${JSON.stringify(data, null, 2)}` }] };
                break;
              }

              case "edit_article": {
                const updateData: Record<string, string> = {};
                if (args.title) updateData.title = args.title;
                if (args.content) updateData.content = args.content;
                if (args.category) updateData.category = args.category;
                if (args.excerpt) updateData.excerpt = args.excerpt;

                const { data, error } = await supabase
                  .from("articles")
                  .update(updateData)
                  .eq("slug", args.slug)
                  .select()
                  .single();
                if (error) throw new Error(error.message);
                result = { content: [{ type: "text", text: `Article updated!\n${JSON.stringify(data, null, 2)}` }] };
                break;
              }

              case "delete_article": {
                const { error } = await supabase
                  .from("articles")
                  .delete()
                  .eq("slug", args.slug);
                if (error) throw new Error(error.message);
                result = { content: [{ type: "text", text: `Article "${args.slug}" deleted.` }] };
                break;
              }

              default:
                throw new Error(`Unknown tool: ${toolName}`);
            }
            break;
          }

          default:
            result = { error: `Unknown method: ${method}` };
        }

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Health check
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", service: "Board Roles MCP" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};
