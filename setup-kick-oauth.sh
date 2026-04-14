#!/bin/bash
# Setup script for Kick OAuth and admin account

echo "🎪 TopJester Kick OAuth Setup 🎪"
echo "================================"
echo ""

# Check if running in production
if [ "$NODE_ENV" = "production" ]; then
    echo "⚠️  This script is for development setup only"
    exit 1
fi

# Create local admin user for development
echo "Creating development admin user..."

# The admin user will be created automatically when you login
# Your Kick username will be stored and you'll be granted admin role

echo ""
echo "📋 To set up real Kick OAuth:"
echo "1. Go to https://kick.com/developer/apps"
echo "2. Create a new app"
echo "3. Set redirect URI to: http://localhost:3000/api/oauth/callback"
echo "4. Copy Client ID and Client Secret"
echo "5. Add them to your .env file:"
echo ""
echo "   KICK_CLIENT_ID=your_actual_client_id"
echo "   KICK_CLIENT_SECRET=your_actual_client_secret"
echo ""
echo "6. To make yourself admin, after first login:"
echo "   - Check server logs for your user ID (format: kick:12345)"
echo "   - Add to .env: OWNER_OPEN_ID=kick:YOUR_USER_ID"
echo ""
echo "👑 You'll then have full admin access to:"
echo "   - Delete/edit nominees"
echo "   - Manage users"
echo "   - View all data"
echo ""
echo "🚀 For now, use the 'Quick Dev Login' button on the login page"
