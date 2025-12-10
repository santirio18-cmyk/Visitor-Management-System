#!/bin/bash

echo "🚀 Deploying Visitor Management System to GitHub Pages..."
echo ""

# Step 1: Build React app
echo "📦 Building React app..."
cd client
npm install
npm run build
echo "✅ Build complete!"
echo ""

# Step 2: Copy build files to docs folder (GitHub Pages standard)
echo "📁 Preparing files for GitHub Pages..."
cd ..
mkdir -p docs
cp -r client/build/* docs/
echo "✅ Files ready in docs/ folder"
echo ""

# Step 3: Commit and push
echo "📤 Committing changes..."
git add docs/
git add client/build/
git commit -m "Deploy to GitHub Pages" || echo "No changes to commit"
git push origin main
echo ""

echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/pages"
echo "2. Set Source to: /docs folder"
echo "3. Your app will be live at: https://santirio18-cmyk.github.io/Visitor-Management-System/"
echo ""
echo "⚠️  Don't forget to deploy backend to Render.com (see GITHUB_PAGES_DEPLOY.md)"

