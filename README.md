# Student Outreach Tracker

A clean and modern Next.js application for tracking student outreach activities with TailwindCSS.

## 🔒 Privacy & Security

**100% Client-Side Application - Your Data Stays Private**

- ✅ **No data storage** - All information exists only in your browser's memory
- ✅ **No data transmission** - Nothing is sent to any servers or external services
- ✅ **No tracking** - Zero analytics, cookies, or data collection
- ✅ **No persistence** - Data is automatically deleted when you close/refresh the page
- ✅ **GDPR/CCPA compliant** - No personal data is stored or processed externally
- ✅ **Completely offline** - Works without internet connection once loaded

## Features

### 📌 Appointments Section
- **Counters**: Track "Students Answered" and "Voicemails Left" with +/- buttons
- **Student Management**: Add, edit, and remove students who canceled or changed appointments
- **Student Details**: Capture Name, Student ID, and Advisor Assigned for each student

### 📞 Call Campaign Section
- **Four Counters**: Track "Students Attempted", "Answered", "Voicemails Left", and "No Answer/No Voicemail"
- **Interactive Controls**: Each counter has +/- buttons for easy updates

### 📝 Summary Generator
- **Generate Summary**: Create a formatted summary of all outreach activities
- **Comprehensive Report**: Includes statistics, success rates, and total contacts

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Track Appointments**: Use the counters in the Appointments section to record answered calls and voicemails
2. **Manage Students**: Add students who canceled or changed appointments with their details
3. **Monitor Calls**: Use the Call Campaign section to track your outreach attempts
4. **Generate Reports**: Click "Generate Summary" to create a formatted report of all activities

## Tech Stack

- **Next.js 14** - React framework (client-side only)
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Hooks** - Local state management (no external storage)

## Technical Implementation

**Privacy-First Architecture:**
- All data stored using React `useState` hooks only
- No `localStorage`, `sessionStorage`, or cookies
- No external API calls or data transmission
- No third-party tracking or analytics libraries
- Fully static export compatible for secure hosting

## Build for Production

```bash
npm run build
npm start
```

The application is fully responsive and works on desktop, tablet, and mobile devices. 