# MedStack

MedStack is a Stack Overflow-style Q&A platform tailored for medical students. It provides a dedicated space for peer-to-peer learning with features like reputation, tagging, and medical-specific disclaimers.

Built with the MERN Stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication**: JWT-based auth with Register/Login (Students, Admins).
- **Questions**: Ask, Answer, Vote, Tag, Comment (Threaded).
- **Reputation System**: Points for upvotes, badges (scaffolded).
- **Medical Safety**: PII warnings and Educational Disclaimers.
- **Search**: Full-text search and filtering by tag.
- **Responsive**: Mobile-friendly UI using Tailwind CSS.

## Prerequisites

- Node.js (v14+)
- Docker & Docker Compose (Recommended) OR MongoDB installed locally.

## Getting Started

### 1. Clone & Install

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Configuration

Create `.env` in `server/` (example provided in `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medstack
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### 3. Run with Docker (Preferred)

If you have Docker Desktop installed:

```bash
docker-compose up --build
```
This starts MongoDB, Server, and Client.
Client: `http://localhost:5173`
Server: `http://localhost:5000`

### 4. Run Locally

Ensure MongoDB is running locally (`mongod`).

**Server:**
```bash
cd server
npm run seed  # (Optional) Populate with demo data
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

## Testing

Run backend tests:
```bash
cd server
npm test
```
(Note: Tests require a running MongoDB instance or mocking solution).

## Security & Ethics

- **PII**: Users are explicitly warned not to upload Patient Identifiable Information.
- **Disclaimer**: The platform is for educational purposes only and does not constitute medical advice.

## Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Mongoose, JWT.
- **DevOps**: Docker, Docker Compose.
