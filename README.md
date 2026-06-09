# Blog Backend

A REST API backend for a blogging platform built with Hono, Prisma, and PostgreSQL, deployed on Cloudflare Workers.

## Tech Stack

- Hono — lightweight web framework for Cloudflare Workers
- Prisma 6.19 with Prisma Accelerate — ORM with connection pooling for edge environments
- PostgreSQL — database hosted on Prisma Postgres
- Zod — request validation
- bcryptjs — password hashing
- JWT — authentication via hono/jwt

## Project Structure

```
src/
├── index.ts                  # app entry point and routing
├── routes/
│   ├── user.ts               # user route definitions
│   └── blog.ts               # blog route definitions
├── controllers/
│   ├── user/
│   │   ├── userSignup.ts
│   │   └── userSignin.ts
│   └── blog/
│       ├── createBlog.ts
│       ├── updateBlog.ts
│       ├── fetchBlog.ts
│       └── fetchBlogBulk.ts
├── middleware/
│   └── authMiddleware.ts
├── validations/
│   ├── user/
│   │   ├── signUp.ts
│   │   └── signIn.ts
│   └── blog/
│       ├── createBlog.ts
│       └── updateBlog.ts
├── types/
│   └── variable.ts           # centralised Env type
└── lib/
    └── accelerateClient.ts   # Prisma Accelerate client helper
```

## API Routes

### User

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/v1/user/signup | No | Create a new account |
| POST | /api/v1/user/signin | No | Sign in and get JWT |

### Blog

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/v1/blog | Yes | Create a new blog post |
| PUT | /api/v1/blog | Yes | Update an existing blog post |
| GET | /api/v1/blog/bulk | Yes | Fetch all blog posts with pagination |
| GET | /api/v1/blog/:id | Yes | Fetch a single blog post |

## Setup

**1. Clone the repo and install dependencies**

```bash
git clone https://github.com/yourusername/blog-app-backend
cd blog-app-backend
npm install
```

**2. Configure environment**

Create a `.dev.vars` file in the root:
```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=your_key
JWT_SECRET=your_jwt_secret
```

Create a `.env` file for Prisma migrations:
```
DATABASE_URL=postgres://your_direct_postgres_url
```

**3. Run migrations**

```bash
npx prisma migrate dev
```

**4. Start the dev server**

```bash
npm run dev
```

Server runs at `http://localhost:8787`

## Deployment

```bash
npm run deploy
```

Add your production environment variables in `wrangler.jsonc` or via the Cloudflare dashboard before deploying.

## Notes

- All blog routes are protected — include `Authorization: Bearer <token>` in request headers
- Pagination on `/bulk` route via `?page=1&limit=10` query params
- Prisma Accelerate is required for Cloudflare Workers compatibility for direct PostgreSQL connections are not supported in edge environments