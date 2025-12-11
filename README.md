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
