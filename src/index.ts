import { Hono } from 'hono'
import { Env } from './types/variable'
import userRouter from './routes/user'
import blogRouter from './routes/blog'

const app = new Hono<Env>()

app.get('/', (c) => {
  return c.json({
    name: 'BlogNest API',
    status: 'running',
    description: 'Type-safe blog REST API built with Hono, Prisma, and PostgreSQL on Cloudflare Workers',
    endpoints: {
      public: [
        { method: 'POST', path: '/api/v1/user/signup', description: 'Register a new user' },
        { method: 'POST', path: '/api/v1/user/signin', description: 'Login and receive JWT' }
      ],
      authRequired: [
        { method: 'POST', path: '/api/v1/blog', description: 'Create a new blog post' },
        { method: 'PUT', path: '/api/v1/blog', description: 'Update an existing blog post' },
        { method: 'GET', path: '/api/v1/blog/:id', description: 'Fetch a single blog post by ID' },
        { method: 'GET', path: '/api/v1/blog/bulk', description: 'Fetch paginated list of blog posts' }
      ]
    }
  })
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
