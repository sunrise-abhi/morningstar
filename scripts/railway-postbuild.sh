#!/bin/bash
# Railway post-build script
# This runs after npm run build

echo "🚂 Running Railway post-build tasks..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

echo "✅ Post-build complete!"

