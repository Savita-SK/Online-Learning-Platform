# Online Learning Platform

A clean, simple online learning platform with authentication, course browsing, quizzes, progress tracking, and certificates.

## Project Structure

- `client/` - static website pages and frontend JavaScript
- `server/` - Node.js Express API and MongoDB backend

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env` with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-learning-platform
JWT_SECRET=supersecretkey
```

3. Start the server

```bash
npm run dev
```

4. Open `client/index.html` in the browser or serve `client/` from a static host.

## Features

- User registration and login
- Protected user dashboard
- Course listing and enrollment
- Quiz submission and progress tracking
- Certificate generation endpoint
