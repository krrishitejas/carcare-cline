# 🚗 CarCare – Vehicle Maintenance & Service Companion  

**CarCare** is a next-generation **vehicle maintenance management** platform designed to simplify how you track, service, and manage your vehicles. Available as both a **web and mobile application**, CarCare helps users **schedule maintenance, track expenses, find nearby service centers**, and receive **real-time service reminders** — all in one place.

---

## 🌟 Key Highlights
- 🚘 Cross-platform (Web + Mobile)
- 🧭 Google Maps & GPS integration
- 💸 Expense tracking & visual analytics
- 🧽 Car wash and maintenance booking
- 🔔 Service reminders & notifications
- 🗄️ PostgreSQL-powered database

---

## 🧩 Project Overview  

CarCare consists of two applications built for seamless user experience:

1. **Web Application** – Built with HTML, CSS, JavaScript, and TailwindCSS  
2. **Mobile Application** – Built using React Native, TypeScript, PostgreSQL & Google Maps API  

---

## 🖥️ Web Application  

**Location:** `/`  
**Stack:** HTML5, CSS3, JavaScript (ES6+), TailwindCSS  

**Features:**  
- Responsive dashboard  
- Booking & expense tracking  
- Garage locator with Leaflet.js  
- Service reminder and notification system  

**Key Files:**  
- `index.html` – Main entry point  
- `booking.html` – Service booking  
- `expenses.html` – Expense tracking  
- `locator.html` – Garage locator  
- `notifications.html` – Alerts and updates  
- `main.js` – Core logic  

---

## 📱 Mobile Application  

**Location:** `/CarCareMobile`  
**Stack:** React Native, TypeScript, PostgreSQL, Google Maps API  

**Platforms:** Android & iOS  

**Features:**  
- Real-time GPS tracking  
- Push notifications  
- PostgreSQL database integration  
- Camera-based receipt scanning  
- Offline caching and cross-platform sync  

---

## 🧱 Project Structure  

```bash
CARCARE/
├── CarCareMobile/                     # React Native Mobile App
│   ├── android/                      # Android config & builds
│   ├── ios/                          # iOS config & CocoaPods
│   ├── src/                          # Source files
│   │   ├── components/               # UI components
│   │   ├── screens/                  # App screens (Home, Booking, etc.)
│   │   ├── navigation/               # Navigation setup
│   │   ├── services/                 # API & DB services
│   │   ├── utils/                    # Utility functions
│   │   └── hooks/                    # Custom React hooks
│   ├── database/                     # PostgreSQL schema & migrations
│   ├── assets/                       # Images, icons, fonts
│   ├── __tests__/                    # Unit & integration tests
│   ├── App.tsx                       # Main App entry
│   ├── package.json                  # Dependencies
│   ├── tsconfig.json                 # TypeScript config
│   └── .env.example                  # Environment template
│
├── index.html                        # Web app entry
├── booking.html
├── expenses.html
├── locator.html
├── main.js
└── notifications.html
````

---

## ✨ Features

### 🔹 Core Features (Both Platforms)

* Vehicle dashboard with service reminders
* Booking system for maintenance & wash
* Expense tracking with analytics
* Garage locator with real-time maps
* Notifications & reminders

### 🔸 Mobile Exclusive

* GPS-powered maps via Google Maps API
* Native push notifications
* Offline data sync
* Receipt scanning (camera integration)
* Cross-platform optimization

---

## 🚀 Quick Start

### 🖥️ Web Application

```bash
# Clone repository
git clone https://www.github.com/krrishitejas/carcare-cline/
cd CARCARE

# Open directly in browser
open index.html

# OR start local server
python -m http.server 8000
# Visit http://localhost:8000
```

### 📱 Mobile Application

```bash
cd CarCareMobile

# Run setup
chmod +x setup.sh
./setup.sh

# Configure environment
cp .env.example .env
# Update DB credentials and Google Maps API key

# Start the app
npm start            # Start Metro bundler
npm run android      # Run on Android
npm run ios          # Run on iOS (macOS only)
```

---

## 📋 Prerequisites

### Web

* Modern browser (Chrome, Firefox, Safari, Edge)
* Local server (optional)

### Mobile

* Node.js 18+
* React Native CLI
* Android Studio / Xcode
* PostgreSQL
* Google Maps API Key

---

## ⚙️ Setup Instructions

### Install Dependencies

```bash
cd CarCareMobile
npm install

# For iOS
cd ios && pod install && cd ..
```

### Database Setup

```bash
brew install postgresql
createdb carcare_db
psql -U your_user -d carcare_db -f database/schema.sql
```

### Google Maps Configuration

1. Create an API key in Google Cloud Console
2. Enable:

   * Maps SDK for Android/iOS
   * Geocoding API
   * Places API
3. Add the key to `.env`

### Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=carcare_db
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 🛠️ Technology Stack

### Web

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** TailwindCSS
* **Charts:** ECharts
* **Maps:** Leaflet.js
* **Animations:** Anime.js

### Mobile

* **Framework:** React Native (v0.74+)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **Maps:** Google Maps API
* **Navigation:** React Navigation v6
* **State:** React Hooks & Context
* **Build:** Metro, Gradle, Xcode

---

## 🗄️ Database Schema

| Table Name          | Description                             |
| ------------------- | --------------------------------------- |
| `users`             | User information                        |
| `vehicles`          | Vehicle details & specifications        |
| `garages`           | Service center details with coordinates |
| `bookings`          | Service scheduling & appointments       |
| `expenses`          | Expense records with categories         |
| `service_reminders` | Maintenance schedules & alerts          |
| `notifications`     | In-app notifications                    |
| `garage_reviews`    | Service center feedback & ratings       |

---

## 🔌 API Integration

### Internal APIs

* User authentication & management
* Vehicle CRUD operations
* Garage search by location
* Booking and expense tracking
* Reminder scheduling
* Push notifications

### External APIs

* **Google Maps API** (location, routes, places)
* **PostgreSQL** (data persistence)

---

## 🧪 Testing

### Web

* Cross-browser manual testing
* Responsive validation

### Mobile

```bash
cd CarCareMobile
npm test             # Unit tests
npm run type-check   # TypeScript validation
npx react-native doctor
```

---

## 📱 Platform Support

| Platform | Minimum Version |
| -------- | --------------- |
| Android  | 6.0+ (API 23+)  |
| iOS      | 11.0+           |
| Chrome   | 80+             |
| Firefox  | 75+             |
| Safari   | 13+             |
| Edge     | 80+             |

---

## 🧰 Troubleshooting

**Web Issues**

* Blank page → Check browser console
* Styling issues → Verify TailwindCSS loading
* Map not loading → Check API key

**Mobile Issues**

* Metro issues → `npx react-native start --reset-cache`
* Android build errors → `./gradlew clean`
* iOS build issues → Run `pod install` again
* DB connection → Verify PostgreSQL is active

---

## 📚 Documentation

* **Web:** Inline docs in HTML/JS
* **Mobile:** See `/CarCareMobile/README.md`
* **Database:** `/CarCareMobile/database/schema.sql`
* **API:** `/CarCareMobile/src/services/`

---

## 🤝 Contributing

```bash
# Fork & clone
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Open a PR
```

**Guidelines:**

* Maintain coding conventions
* Write meaningful commits
* Update docs when needed
* Test all major features

---

## 🧭 Roadmap

* 🔑 User Authentication & Profiles
* 📲 Push Notifications
* 🧾 Receipt OCR Scanning
* 📊 Advanced Analytics
* 🧑‍🤝‍🧑 Social & Recommendation System
* 🔄 Offline Sync
* 🚙 Multi-Vehicle Support
* 🧰 Service History Tracking

---

## 📄 License

Licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for more details.

---

## 🙏 Acknowledgments

* **React Native** community
* **Google Maps API** for location data
* **PostgreSQL** for powerful data handling
* **TailwindCSS** for modern UI design
* All **open-source contributors**

---

## 💬 Support

For help or bug reports:

* Web Issues → Check browser console
* Mobile Issues → See `/CarCareMobile/README.md`
* Database Issues → Verify PostgreSQL logs
* API Issues → Check keys & quotas

---

### 🚗 CarCare – Your All-in-One Vehicle Maintenance Companion

Manage your car smarter, cleaner, and easier — anywhere, anytime!
