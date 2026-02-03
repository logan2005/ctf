#!/bin/bash

echo "========================================"
echo "  CyberQuest CTF - Netlify Deployment"
echo "========================================"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI not found!"
    echo ""
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
    echo ""
fi

echo ""
echo "========================================"
echo "  Deployment Options"
echo "========================================"
echo ""
echo "1. Deploy to production (recommended)"
echo "2. Deploy preview (test first)"
echo "3. Login to Netlify"
echo "4. Check deployment status"
echo "5. Open Netlify dashboard"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "Deploying to production..."
        netlify deploy --prod
        ;;
    2)
        echo ""
        echo "Deploying preview..."
        netlify deploy
        ;;
    3)
        echo ""
        echo "Opening Netlify login..."
        netlify login
        ;;
    4)
        echo ""
        echo "Checking status..."
        netlify status
        ;;
    5)
        echo ""
        echo "Opening dashboard..."
        netlify open
        ;;
    *)
        echo "Invalid choice!"
        ;;
esac

echo ""
echo "========================================"
echo "  Deployment Complete!"
echo "========================================"
echo ""
