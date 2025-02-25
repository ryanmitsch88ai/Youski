# You Ski - Smart Ski Navigation App

A Next.js web application that provides personalized ski navigation and recommendations based on user preferences and real-time conditions.

## Features

- User authentication and profile management
- Personalized ski run recommendations
- Interactive ski map with real-time GPS tracking
- Performance tracking and progression monitoring
- Social features and community integration

## Prerequisites

- Node.js 18.x or later
- Firebase account and project setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/         # API routes
│   ├── components/  # React components
│   └── lib/        # Utilities, hooks, and contexts
├── pages/          # Next.js pages
└── styles/         # Global styles
```

## Tech Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Firebase (Authentication, Firestore)
- Tailwind CSS
- Vercel (Deployment)