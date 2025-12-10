#!/bin/bash

echo "🚀 Deploying Visitor Management System to GitHub Pages..."
echo ""

# Step 1: Build React app
echo "📦 Building React app..."
cd client
npm install --silent
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check errors above."
    exit 1
fi
echo "✅ Build complete!"
echo ""

# Step 2: Copy build files to docs folder
echo "📁 Preparing files for GitHub Pages..."
cd ..
mkdir -p docs
rm -rf docs/*
cp -r client/build/* docs/
touch docs/.nojekyll
echo "✅ Files ready in docs/ folder"
echo ""

# Step 3: Commit and push
echo "📤 Committing and pushing changes..."
git add docs/
git add client/package-lock.json 2>/dev/null || true
git commit -m "Deploy to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "🌐 Your app will be live in 1-2 minutes at:"
    echo "   https://santirio18-cmyk.github.io/Visitor-Management-System/"
    echo ""
    echo "💡 Tip: Wait 1-2 minutes, then do a hard refresh (Ctrl+Shift+R) to see changes"
else
    echo ""
    echo "❌ Push failed! Please check your git configuration."
    exit 1
fi

