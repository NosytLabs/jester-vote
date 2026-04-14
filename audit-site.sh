#!/bin/bash
# Debug/Audit script for TopJester site

echo "🎪 TopJester Site Audit & Debug"
echo "==============================="
echo ""

BASE_URL="http://localhost:3002"

# Check server health
echo "1️⃣ Checking server health..."
HEALTH=$(curl -s "$BASE_URL/api/health" 2>/dev/null)
if [ -n "$HEALTH" ]; then
    echo "✅ Server is running"
    echo "Response: $HEALTH" | head -c 200
else
    echo "❌ Server not responding"
fi
echo ""
echo ""

# Check OAuth providers
echo "2️⃣ Checking OAuth providers..."
PROVIDERS=$(curl -s "$BASE_URL/api/oauth/providers" 2>/dev/null)
if [ -n "$PROVIDERS" ]; then
    echo "✅ OAuth endpoint working"
    echo "Available: $PROVIDERS"
else
    echo "❌ OAuth endpoint failed"
fi
echo ""
echo ""

# Check nominees API
echo "3️⃣ Checking nominees API..."
NOMINEES=$(curl -s "$BASE_URL/api/nominees" 2>/dev/null)
if [ -n "$NOMINEES" ]; then
    COUNT=$(echo "$NOMINEES" | grep -o '"id"' | wc -l)
    echo "✅ Nominees API working ($COUNT nominees)"
else
    echo "❌ Nominees API failed"
fi
echo ""
echo ""

# Check votes stream
echo "4️⃣ Checking votes stream endpoint..."
STREAM=$(curl -s "$BASE_URL/api/votes/stream" -H "Accept: text/event-stream" 2>/dev/null | head -c 100)
if [ -n "$STREAM" ]; then
    echo "✅ SSE stream endpoint accessible"
else
    echo "⚠️ SSE stream check inconclusive (expected)"
fi
echo ""
echo ""

# Test Kick OAuth URL generation
echo "5️⃣ Testing Kick OAuth URL..."
KICK_URL=$(curl -s "$BASE_URL/api/oauth/login/kick" -I 2>/dev/null | grep -i location | awk '{print $2}' | tr -d '\r')
if [ -n "$KICK_URL" ]; then
    echo "✅ Kick OAuth URL generated"
    echo "URL: $KICK_URL" | head -c 150
else
    echo "⚠️ Could not capture redirect (may still work)"
fi
echo ""
echo ""

# Check database
echo "6️⃣ Checking database..."
if [ -f "/home/oldpc/jester-vote/local.db" ]; then
    SIZE=$(stat -c%s "/home/oldpc/jester-vote/local.db" 2>/dev/null)
    echo "✅ Database exists (${SIZE} bytes)"
else
    echo "⚠️ Database file not found (will be created on first use)"
fi
echo ""
echo ""

# Summary
echo "📊 Audit Summary:"
echo "================"
echo "Server: $BASE_URL"
echo "OAuth Providers: $PROVIDERS"
echo ""
echo "🚀 Ready for Kick login test!"
echo "Visit: $BASE_URL/login"
echo ""
echo "After logging in with Kick:"
echo "1. Check server logs for your user ID"
echo "2. Add OWNER_OPEN_ID=kick:YOUR_ID to .env"
echo "3. Restart server to become admin"
