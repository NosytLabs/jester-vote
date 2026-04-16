#!/bin/bash
echo "🔍 Quick TypeScript Check"
echo "========================="
npx tsc --noEmit 2>&1 | grep -E "error TS|✅|❌" | head -20
echo ""
echo "Done!"
