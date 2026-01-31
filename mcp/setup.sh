#!/bin/bash
# Board Roles MCP Setup Script for Mac

echo "🚀 Setting up Board Roles MCP for Claude Desktop..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Install dependencies
echo "📦 Installing dependencies..."
cd "$SCRIPT_DIR"
npm install
npm run build

# Create Claude Desktop config directory if it doesn't exist
CONFIG_DIR="$HOME/Library/Application Support/Claude"
CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

mkdir -p "$CONFIG_DIR"

# Check if config file exists
if [ -f "$CONFIG_FILE" ]; then
    echo "⚠️  Config file already exists at: $CONFIG_FILE"
    echo "Please manually add the MCP configuration."
else
    # Create the config file
    cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "board-roles": {
      "command": "node",
      "args": ["$SCRIPT_DIR/server.js"],
      "env": {
        "SUPABASE_URL": "https://rxazwptngtabeoilfexy.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4YXp3cHRuZ3RhYmVvaWxmZXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTg4OTk2NiwiZXhwIjoyMDg1NDY1OTY2fQ.s0w5M4afB99Kuix--q6CJwOJCcWeuDJM7FuM2QltKDk"
      }
    }
  }
}
EOF
    echo "✅ Created config at: $CONFIG_FILE"
fi

echo ""
echo "✅ Setup complete! Credentials are pre-configured."
echo ""
echo "🔄 Now restart Claude Desktop and you're ready to go!"
echo ""
echo "💬 Try saying: 'List all articles on my website'"
