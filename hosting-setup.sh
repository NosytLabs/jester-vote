#!/bin/bash
# Low-Cost Hosting Setup for TopJester on Your PC
# This script sets up systemd services for auto-start and Cloudflare tunnel

echo "🚀 TopJester Low-Cost Hosting Setup"
echo "=================================="
echo ""

# Check if running as root for systemd
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Some operations may require sudo"
fi

echo "📋 Setup Options:"
echo ""
echo "1. SYSTEMD SERVICE (Recommended)"
echo "   - Auto-starts on boot"
echo "   - Restarts if crashes"
echo "   - Logs to journald"
echo ""
echo "2. PM2 (Alternative)"
echo "   - Process manager"
echo "   - Good for development"
echo ""
echo "3. CLOUDFLARE TUNNEL"
echo "   - Free public URL"
echo "   - No port forwarding needed"
echo "   - Works with dynamic IP"
echo ""

# Create systemd service file
cat > /tmp/topjester.service << 'EOF'
[Unit]
Description=TopJester Streaming Rankings Site
After=network.target

[Service]
Type=simple
User=oldpc
WorkingDirectory=/home/oldpc/jester-vote
ExecStart=/usr/bin/npm run dev
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Created systemd service file"
echo ""
echo "To install systemd service:"
echo "  sudo cp /tmp/topjester.service /etc/systemd/system/"
echo "  sudo systemctl daemon-reload"
echo "  sudo systemctl enable topjester"
echo "  sudo systemctl start topjester"
echo ""

# Create Cloudflare tunnel config
cat > /tmp/cf-tunnel.yml << 'EOF'
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/oldpc/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: topjester.com
    service: http://localhost:3000
  - hostname: www.topjester.com
    service: http://localhost:3000
  - service: http_status:404
EOF

echo "✅ Created Cloudflare tunnel config template"
echo ""
echo "To set up Cloudflare tunnel:"
echo "  1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation"
echo "  2. Authenticate: cloudflared tunnel login"
echo "  3. Create tunnel: cloudflared tunnel create topjester"
echo "  4. Edit /tmp/cf-tunnel.yml with your tunnel ID"
echo "  5. Copy to ~/.cloudflared/config.yml"
echo "  6. Run: cloudflared tunnel run"
echo ""

# Create docker-compose for easy deployment
cat > /home/oldpc/jester-vote/docker-compose.yml << 'EOF'
version: '3.8'

services:
  topjester:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./data.db
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    restart: unless-stopped
    depends_on:
      - topjester
EOF

echo "✅ Created docker-compose.yml"
echo ""
echo "To run with Docker Compose:"
echo "  docker-compose up -d"
echo ""

# Create start script
cat > /home/oldpc/jester-vote/start-production.sh << 'EOF'
#!/bin/bash
# Start TopJester in production mode

export NODE_ENV=production
export PORT=3000

echo "🚀 Starting TopJester..."
npm run build
npm start
EOF
chmod +x /home/oldpc/jester-vote/start-production.sh

echo "✅ Created start-production.sh"
echo ""

echo "💰 COST BREAKDOWN:"
echo "=================="
echo ""
echo "✅ Your PC (Existing): $0"
echo "✅ Cloudflare Tunnel: $0 (free)"
echo "✅ Domain (optional): ~$10/year"
echo "✅ SQLite Database: $0 (local file)"
echo ""
echo "TOTAL: $0/month (or $10/year with custom domain)"
echo ""
echo "🎯 RECOMMENDED SETUP:"
echo "==================="
echo ""
echo "For FREE hosting with public access:"
echo "1. Use Cloudflare Tunnel (free)"
echo "2. Use trycloudflare.com subdomain (free)"
echo "3. Run on your PC 24/7 (electricity cost only)"
echo ""
echo "Commands to get started:"
echo "  ./start-production.sh     # Start the site"
echo "  ./setup-kick-oauth.sh     # Configure OAuth"
echo ""
