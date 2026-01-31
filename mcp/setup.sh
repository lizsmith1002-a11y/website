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
        "SUPABASE_SERVICE_ROLE_KEY": "REPLACE_WITH_YOUR_SERVICE_ROLE_KEY"
      }
    }
  }
}
EOF
    echo "✅ Created config at: $CONFIG_FILE"
fi

echo ""
echo "📝 IMPORTANT: You need to add your Supabase service role key!"
echo "   1. Go to: https://supabase.com/dashboard → Your Project → Settings → API"
echo "   2. Copy the 'service_role' key (NOT the anon key)"
echo "   3. Edit: $CONFIG_FILE"
echo "   4. Replace REPLACE_WITH_YOUR_SERVICE_ROLE_KEY with your key"
echo ""
echo "🔄 Then restart Claude Desktop and you're ready to go!"
echo ""
echo "💬 Try saying: 'List all articles on my website'"
