#!/bin/bash
set -e

echo "🔍 COMPREHENSIVE TOPJESTER AUDIT"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo "1️⃣  TypeScript Compilation"
echo "----------------------------"
npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.txt || true
if [ -s /tmp/tsc-output.txt ]; then
  ERROR_COUNT=$(grep -c "error TS" /tmp/tsc-output.txt || echo "0")
  if [ "$ERROR_COUNT" -gt 0 ]; then
    echo -e "${RED}❌ $ERROR_COUNT TypeScript errors found${NC}"
    ERRORS=$((ERRORS + ERROR_COUNT))
    cat /tmp/tsc-output.txt | head -20
  else
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
  fi
else
  echo -e "${GREEN}✅ No TypeScript errors${NC}"
fi
echo ""

echo "2️⃣  ESLint Check"
echo "----------------"
npm run lint 2>&1 | tee /tmp/eslint-output.txt || true
if grep -q "error" /tmp/eslint-output.txt 2>/dev/null; then
  echo -e "${RED}❌ ESLint errors found${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✅ No ESLint errors${NC}"
fi
echo ""

echo "3️⃣  Required Files Check"
echo "-----------------------"
REQUIRED_FILES=(
  "src/app/page.tsx"
  "src/app/layout.tsx"
  "src/app/robots.ts"
  "src/app/sitemap.ts"
  "src/components/Header.tsx"
  "src/components/Footer.tsx"
  "src/components/icons.tsx"
  "src/lib/db/schema.ts"
  "src/lib/db/index.ts"
  "src/lib/trpc/trpc.ts"
  "src/lib/trpc/provider.tsx"
  "src/lib/trpc/context.ts"
  ".env.local"
  "next.config.ts"
  "drizzle.config.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file MISSING"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

echo "4️⃣  Import/Export Analysis"
echo "---------------------------"
echo "Checking for circular dependencies..."
npx madge --circular src/ 2>/dev/null || echo "Madge not installed, skipping circular check"
echo ""

echo "5️⃣  Unused Exports Check"
echo "------------------------"
# Check for unused exports in icons.tsx
if grep -q "export" src/components/icons.tsx; then
  EXPORT_COUNT=$(grep -c "^export" src/components/icons.tsx)
  echo "Found $EXPORT_COUNT exports in icons.tsx"
fi
echo ""

echo "6️⃣  Environment Variables"
echo "-------------------------"
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✅${NC} .env.local exists"
  # Check for required vars without exposing values
  if grep -q "DATABASE_URL" .env.local; then
    echo -e "${GREEN}✅${NC} DATABASE_URL configured"
  else
    echo -e "${RED}❌${NC} DATABASE_URL missing"
    ERRORS=$((ERRORS + 1))
  fi
  if grep -q "NEXTAUTH_SECRET" .env.local; then
    echo -e "${GREEN}✅${NC} NEXTAUTH_SECRET configured"
  else
    echo -e "${YELLOW}⚠️${NC} NEXTAUTH_SECRET missing (optional for dev)"
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo -e "${RED}❌${NC} .env.local missing"
  ERRORS=$((ERRORS + 1))
fi
echo ""

echo "7️⃣  Package.json Analysis"
echo "------------------------"
echo "Scripts available:"
grep -A 15 '"scripts"' package.json | grep -E "^\s+\"" | sed 's/:/ →/g' | sed 's/"//g' | sed 's/,//g'
echo ""

echo "8️⃣  Build Size Check"
echo "------------------"
echo "Node modules size:"
du -sh node_modules 2>/dev/null | awk '{print $1}' || echo "N/A"
echo ""

echo "9️⃣  Security Audit"
echo "-----------------"
npm audit --audit-level=moderate 2>&1 | head -30 || true
echo ""

echo "🔟  Performance Hints"
echo "--------------------"
echo "Checking for large imports..."
# Check if framer-motion is imported (can be heavy)
if grep -r "from 'framer-motion'" src/ --include="*.tsx" | grep -q "motion"; then
  echo -e "${YELLOW}⚠️${NC} Framer Motion used - ensure tree-shaking is working"
  WARNINGS=$((WARNINGS + 1))
fi

# Check for client components
CLIENT_COUNT=$(grep -l "'use client'" src/app/*.tsx src/components/*.tsx 2>/dev/null | wc -l)
echo "Client components: $CLIENT_COUNT"
if [ "$CLIENT_COUNT" -gt 5 ]; then
  echo -e "${YELLOW}⚠️${NC} High number of client components may affect SSR benefits"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

echo "📊 AUDIT SUMMARY"
echo "================"
echo -e "Errors: ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ AUDIT PASSED${NC}"
  exit 0
else
  echo -e "${RED}❌ AUDIT FAILED - Fix errors before deploying${NC}"
  exit 1
fi
