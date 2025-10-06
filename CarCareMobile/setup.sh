#!/bin/bash

# CarCare Mobile Setup Script
echo "🚗 CarCare Mobile - Quick Setup Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the CarCareMobile project directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Setup environment file
if [ ! -f ".env" ]; then
    echo "🔧 Setting up environment file..."
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update the .env file with your actual configuration values"
else
    echo "✅ .env file already exists"
fi

# iOS setup (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    if command -v pod &> /dev/null; then
        cd ios && pod install && cd ..
        echo "✅ iOS pods installed"
    else
        echo "⚠️  CocoaPods not found. Install with: sudo gem install cocoapods"
    fi
fi

# Check for Android SDK
if [ -d "$ANDROID_HOME" ]; then
    echo "✅ Android SDK found at: $ANDROID_HOME"
else
    echo "⚠️  Android SDK not found. Please install Android Studio and set ANDROID_HOME"
fi

# Database setup reminder
echo ""
echo "📊 Database Setup Required:"
echo "1. Install PostgreSQL if not already installed"
echo "2. Create database: createdb carcare_db"
echo "3. Run schema: psql -U your_user -d carcare_db -f database/schema.sql"
echo "4. Update database credentials in .env file"

# Google Maps API reminder
echo ""
echo "🗺️  Google Maps Setup Required:"
echo "1. Go to https://console.cloud.google.com/"
echo "2. Enable Maps SDK for Android, Maps SDK for iOS, Geocoding API"
echo "3. Create an API key"
echo "4. Update GOOGLE_MAPS_API_KEY in .env file"
echo "5. Add API key to android/app/src/main/AndroidManifest.xml"

echo ""
echo "🎉 Setup complete! Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Set up PostgreSQL database"
echo "3. Configure Google Maps API key"
echo "4. Run 'npm start' to start the Metro bundler"
echo "5. Run 'npm run android' or 'npm run ios' to launch the app"

echo ""
echo "📖 For detailed instructions, see README.md"