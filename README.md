# NextServe Social AI

An AI-first social media automation platform for agencies and local businesses.

## Sprint 1

- Next.js 15 web application
- NestJS authentication API
- PostgreSQL and Prisma user model
- Registration, login, logout and password-reset endpoints
- HTTP-only cookie sessions
- Protected agency dashboard

## Run locally

1. Copy `.env.example` to `.env` and replace `JWT_SECRET`.
2. Start PostgreSQL: `docker compose up -d`.
3. Install packages: `npm install`.
4. Generate Prisma: `npm run db:generate`.
5. Create the database schema: `npm run db:push`.
6. Start both apps: `npm run dev`.

Web: http://localhost:3000  
API: http://localhost:4000/api  
Health check: http://localhost:4000/api/health

In development, the forgot-password endpoint returns its reset token. Production email delivery will be connected in a later infrastructure step.
