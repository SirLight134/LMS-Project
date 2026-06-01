# LMS Platform

A full-stack **Learning Management System** built with **React**, **Express**, **MongoDB**, and **Tailwind CSS**. Students can browse, enroll in, and track progress through courses. Educators can create, manage, and publish courses with rich content.

## Tech Stack

**Front-End** | **Back-End** | **DevOps**
--- | --- | ---
React 19 | Express 5 | Vite
Tailwind CSS 3 | Mongoose 8 | Concurrently
React Router 7 | JWT (access + refresh) | Nodemon
Lucide React | bcrypt | ESLint
Vite 7 | express-validator | —
— | express-rate-limit | —

## Features

### For Students
- Browse and search available courses
- Enroll in courses with one click
- Track learning progress per course (completed lessons, overall progress)
- Continue learning from where you left off
- View personalized course recommendations
- Manage your profile (name, bio, avatar)

### For Educators
- Create, update, and delete courses
- Add content (video, PDF, article, quiz) to courses
- Publish/unpublish courses
- View dashboard with stats (total courses, total students enrolled)
- Manage educator profile

### Security
- JWT access tokens (3h) + httpOnly refresh tokens (7d)
- Role-based authorization (student / educator)
- Rate limiting on auth endpoints (20 req / 15 min)
- Password hashing with bcrypt (salt rounds: 10)
- Input validation via express-validator DTOs

## Project Structure

```
LMS-Project/
├── Back-End/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   ├── educator.controller.js
│   │   └── student.controller.js
│   ├── dto/                  # express-validator schemas
│   │   ├── auth/
│   │   ├── content/
│   │   └── course/
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT verification
│   │   └── roles.middleware.js # Role authorization
│   ├── models/
│   │   ├── Users.model.js
│   │   ├── Course.model.js
│   │   ├── Content.model.js
│   │   └── Progress.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── educator.route.js
│   │   └── student.route.js
│   ├── index.js              # Express entry point
│   └── .env                  # Environment variables
│
├── Front-End/theProject/
│   ├── src/
│   │   ├── api/              # API client functions
│   │   │   ├── auth.js
│   │   │   ├── educator.js
│   │   │   ├── student.js
│   │   │   └── fetchWithAuth.js
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar/
│   │   │   ├── Student/
│   │   │   ├── Footer.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   └── pages/
│   │       ├── HomePage/     # Landing page sections
│   │       ├── student/      # Student dashboard & courses
│   │       └── educator/     # Educator dashboard & management
│   └── vite.config.js
│
├── package.json              # Root orchestration (concurrently)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd LMS-Project

# Install all dependencies
npm install
npm install --prefix Back-End
npm install --prefix Front-End/theProject
```

### Environment Variables

Create `Back-End/.env`:

```env
PORT = 5051
JWT_SECRET = <your-random-secret>
JWT_REFRESH_TOKEN = <your-random-refresh-secret>
atlas_URL = mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

Generate strong secrets:
```bash
openssl rand -hex 32
```

### Run the App

```bash
# Start both server and client concurrently (from root)
npm run dev

# Or run them separately:
npm run server    # Express on http://localhost:5051
npm run client    # Vite on http://localhost:5173
```

The front-end proxies `/api` requests to the back-end automatically (configured in `vite.config.js`).

## API Overview

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register (student or educator) |
| POST | `/api/auth/login` | Login, returns JWT + httpOnly refresh cookie |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Clear refresh cookie |

### Student
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/courses` | Enrolled courses with progress |
| GET | `/api/student/courses/:id` | Course detail with content |
| POST | `/api/student/enroll/:id` | Enroll in a course |
| POST | `/api/student/courses/:id/progress` | Update lesson progress |
| GET | `/api/student/stats` | Dashboard stats |
| GET | `/api/student/recommended` | Recommended courses |
| GET | `/api/student/profile` | Get profile |
| PUT | `/api/student/profile` | Update profile |

### Educator
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/educator/stats` | Total courses & students |
| GET/POST | `/api/educator/courses` | List / Create courses |
| GET/PUT/DELETE | `/api/educator/courses/:id` | Single course CRUD |
| GET/POST | `/api/educator/contents` | List / Create content |
| GET/PUT/DELETE | `/api/educator/contents/:id` | Single content CRUD |
| GET/PUT | `/api/educator/profile` | Educator profile |

## Database Schema

**User** → `userName`, `email`, `password` (hashed), `role` (student|educator), `bio`, `avatar`

**Course** → `title`, `description`, `createdBy` (→ User), `price`, `category`, `thumbnail`, `isPublished`, `students[]` (→ User), `content[]` (→ Content)

**Content** → `title`, `description`, `type` (video|pdf|article|quiz), `url`, `course` (→ Course), `order`, `isPublished`

**Progress** → `student` (→ User), `course` (→ Course), `completedLessons[]` (→ Content), `lastSeenLesson` (→ Content)

## Build

```bash
cd Front-End/theProject
npm run build    # Outputs to dist/
```
