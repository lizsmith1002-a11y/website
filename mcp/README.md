# Board Roles MCP Server

An MCP (Model Context Protocol) server for managing the Board Roles website content.

## Features

- **List articles** - See all blog posts
- **Create articles** - Add new articles
- **Edit articles** - Update existing articles
- **Delete articles** - Remove articles
- **Update theme** - Change website colors
- **Get/update site config** - Manage site settings
- **Publish changes** - Commit and push to deploy

## Setup for Claude Desktop

1. Build the MCP server:
   ```bash
   cd mcp
   npm install
   npm run build
   ```

2. Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

   ```json
   {
     "mcpServers": {
       "board-roles": {
         "command": "node",
         "args": ["/path/to/website/mcp/server.js"],
         "env": {
           "WEBSITE_ROOT": "/path/to/website"
         }
       }
     }
   }
   ```

3. Restart Claude Desktop

## Usage Examples

Once connected, you can ask Claude:

- "List all the articles on my website"
- "Create a new article about board meeting preparation"
- "Edit the article about treasurer responsibilities"
- "Change the website colors to green"
- "Publish my changes to the website"

## Available Tools

| Tool | Description |
|------|-------------|
| `list_articles` | List all articles |
| `get_article` | Get full content of an article |
| `create_article` | Create a new article |
| `edit_article` | Edit an existing article |
| `delete_article` | Delete an article |
| `update_theme` | Update website colors |
| `get_site_config` | Get site configuration |
| `update_site_config` | Update site settings |
| `publish_changes` | Commit and push changes |
