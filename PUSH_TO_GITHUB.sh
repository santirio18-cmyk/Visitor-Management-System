#!/bin/bash

# Navigate to project directory
cd "/Users/santhoshpremkumar/Vendor Management System"

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository. Make sure you're in the project directory."
    exit 1
fi

echo "✅ Found git repository!"
echo ""
echo "Current directory: $(pwd)"
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "Remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub repository URL: " repo_url
        git remote set-url origin "$repo_url"
    fi
else
    echo "No remote repository configured yet."
    echo ""
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git): " repo_url
    git remote add origin "$repo_url"
fi

echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Check your GitHub repository."


