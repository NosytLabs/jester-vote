#!/bin/bash
cd /home/oldpc/.openclaw/workspace/jester-vote-repo
pkill -f "node dist/index.js" 2>/dev/null
sleep 2
PORT=3001 node dist/index.js &
sleep 3
echo "Server started on port 3001"
