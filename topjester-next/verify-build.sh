#!/bin/bash
set -e

echo "🔍 Verifying TopJester Next.js build..."

echo ""
echo "1️⃣ Checking TypeScript compilation..."
npx tsc --noEmit 2>&1 | head -20 || true

echo ""
echo "2️⃣ Checking for required files..."
files=(
  "src/app/page.tsx"
  "src/app/layout.tsx"
  "src/app/robots.ts"
  "src/app/sitemap.ts"
  "src/components/Header.tsx"
  "src/components/Footer.tsx"
  "src/lib/db/schema.ts"
  "src/lib/db/index.ts"
  "src/lib/trpc/trpc.ts"
  "src/lib/trpc/provider.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file MISSING"
  fi
done

echo ""
echo "3️⃣ Environment check..."
if [ -f ".env.local" ]; then
  echo "  ✅ .env.local exists"
else
  echo "  ⚠️  .env.local missing (copy from .env.example)"
fi

echo ""
echo "4️⃣ Package.json scripts..."
cat package.json | grep -A 10 '"scripts"'

echo ""
echo "✅ Verification complete!"
echo ""
echo "To build and deploy:"
echo "  npm run build"
echo "  # Or for Vercel:"
echo "  vercel --prod"
