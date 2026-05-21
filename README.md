# DSA Tracker

A full-stack web app to learn Data Structures & Algorithms systematically. Browse 47 curated topics, get AI-generated practice questions, and track your mastery over time.

## Features

- **47 DSA topics** organized from Basic to Advanced with difficulty ratings and estimated hours
- **AI-generated prompts** — copy a ready-made prompt for any topic (easy / medium / hard) and take it to Claude or ChatGPT
- **Progress tracking** — log every attempt, track solved count, accuracy, and mastery level per topic
- **Dashboard** — see weak topics, overall stats, and recent activity at a glance
- **Real-world use cases** — each topic shows how it's used at companies like Google, Netflix, and Uber
- **Learning resources** — direct links to GeeksforGeeks articles and YouTube search for every topic

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Backend | Node.js, Express |
| Database | PostgreSQL 15 |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Docker, Vercel |

## Getting Started (Local)

### Prerequisites
- Docker Desktop
- Node.js 18+

### Run with Docker
```bash
# Clone the repo
git clone https://github.com/your-username/DSA_Tracker.git
cd DSA_Tracker

# Start all services
docker compose up --build -d

# Run migrations and seed data
docker compose exec backend node src/migrations/migrations.js
docker compose exec backend node src/seeds/seedTopicsComprehensive.js
docker compose exec backend node src/seeds/seedDiagrams.js
docker compose exec backend node src/seeds/seedLeetcode.js
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables (backend)

Create `backend/.env` from the example:
```bash
cp backend/.env.example backend/.env
```

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://dsa_user:dsa_password@localhost:5432/dsa_tracker
JWT_SECRET=your_secret_key_at_least_32_characters
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

## How It Works

1. **Browse topics** — filter by Basic / Advanced, search by name
2. **Open a topic** — read the simple definition and see real-world company use cases
3. **Click "Get Questions & Track Progress"** — choose a difficulty, copy the generated prompt
4. **Paste into Claude or ChatGPT** — get practice questions tailored to that topic
5. **Log your result** — mark as solved / attempted, record time taken
6. **Check your dashboard** — see mastery bars, accuracy, and which topics need more work

## Project Structure

```
DSA_Tracker/
├── backend/
│   ├── src/
│   │   ├── config/        # DB, env, logger
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth, error handler, rate limiter
│   │   ├── migrations/    # SQL schema migrations
│   │   ├── routes/        # Express routers
│   │   ├── seeds/         # Topic, diagram, and LeetCode seeds
│   │   └── services/      # Business logic
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Route-level page components
│   │   └── services/      # Axios API client
│   └── Dockerfile
└── docker-compose.yml
```

## Deployment

Deployed on **Vercel** (frontend + backend as serverless functions) with **Vercel Postgres** for the database.
