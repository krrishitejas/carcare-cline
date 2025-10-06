# CarCare Mobile App - Setup Instructions

## Overview
This is the mobile version of the CarCare web application, built with React Native for both Android and iOS platforms. It includes Google Maps integration for garage location services and PostgreSQL database connectivity for data management.

## Prerequisites

### Required Software
- Node.js (version 18 or higher)
- npm or Yarn package manager
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- PostgreSQL database server

### Mobile Development Setup
1. **For Android:**
   - Install Android Studio
   - Set up Android SDK and platform tools
   - Create an Android Virtual Device (AVD)

2. **For iOS (macOS only):**
   - Install Xcode from the Mac App Store
   - Install iOS Simulator
   - Install CocoaPods: `sudo gem install cocoapods`

## Installation

### 1. Install Dependencies
```bash
cd CarCareMobile
npm install

# For iOS only
cd ios && pod install && cd ..
```

### 2. Database Setup
1. Install PostgreSQL if not already installed
2. Create a new database named `carcare_db`
3. Run the database schema:
```bash
psql -U your_username -d carcare_db -f database/schema.sql
```

### 3. Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the following variables:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=carcare_db
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Google Maps API Setup
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Geocoding API
   - Places API
4. Create credentials (API Key)
5. Add the API key to your `.env` file
6. For Android: Update `android/app/src/main/AndroidManifest.xml` with your API key
7. For iOS: Update `ios/CarCareMobile/Info.plist` with your API key

## Running the Application

### Android
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android app
npm run android
```

### iOS
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS app
npm run ios
```

## Project Structure

```
CarCareMobile/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API and database services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── android/              # Android-specific code
├── ios/                  # iOS-specific code
├── database/             # Database schema and migrations
└── package.json
```

## Features

### Implemented Features
- **Dashboard**: Vehicle overview, service reminders, expense summary
- **Google Maps Integration**: Find nearby garages and service centers
- **Database Connectivity**: PostgreSQL integration for data persistence
- **Cross-Platform**: Runs on both Android and iOS
- **TypeScript Support**: Full type safety

### Planned Features
- **Booking System**: Complete service booking workflow
- **Expense Tracking**: Detailed expense management with charts
- **Push Notifications**: Service reminders and booking updates
- **User Authentication**: Secure login and user management
- **Receipt Scanner**: Camera integration for expense receipts

## Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:
- `users` - User account information
- `vehicles` - Vehicle details and specifications
- `garages` - Service center information with location data
- `bookings` - Service appointments and bookings
- `expenses` - Vehicle-related expenses tracking
- `service_reminders` - Maintenance and service reminders
- `notifications` - In-app notifications

## API Endpoints

The application includes a complete API service layer with endpoints for:
- User management
- Vehicle CRUD operations
- Garage search and location services
- Booking management
- Expense tracking
- Service reminders
- Notifications

## Development

### Adding New Features
1. Create new screen components in `src/screens/`
2. Add navigation routes in `src/navigation/AppNavigator.tsx`
3. Create API services in `src/services/api.ts`
4. Add database operations as needed

### Testing
```bash
# Run tests
npm test

# Run type checking
npm run type-check
```

### Building for Production

#### Android
```bash
cd android
./gradlew assembleRelease
```

#### iOS
```bash
cd ios
xcodebuild -workspace CarCareMobile.xcworkspace -scheme CarCareMobile -configuration Release
```

## Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build errors**: Clean build with `cd android && ./gradlew clean`
3. **iOS build errors**: Clean build folder in Xcode
4. **Database connection**: Ensure PostgreSQL is running and credentials are correct
5. **Maps not loading**: Verify Google Maps API key is correct and APIs are enabled

### Platform-Specific Issues

#### Android
- Ensure Android SDK is properly installed
- Check that virtual device is running
- Verify USB debugging is enabled for physical devices

#### iOS
- Ensure Xcode command line tools are installed
- Run `pod install` after adding new dependencies
- Check iOS Simulator is available

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review React Native documentation
3. Check Google Maps documentation for mapping issues
4. Review PostgreSQL documentation for database issues

## License

This project is licensed under the MIT License.