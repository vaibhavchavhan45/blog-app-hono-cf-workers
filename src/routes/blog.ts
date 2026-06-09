import { Hono } from "hono";
import { Env } from "../types/variable";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBlog } from "../controllers/blog/createBlog";
import { updateBlog } from "../controllers/blog/updateBlog";
import { fetchBlog } from "../controllers/blog/fetchBlog";
import { fetchAllBlogs } from "../controllers/blog/fetchBlogBulk";


const blogRouter = new Hono<Env>()

blogRouter.post('/', authMiddleware, createBlog)
blogRouter.put('/',  authMiddleware, updateBlog)
blogRouter.get('/bulk', authMiddleware, fetchAllBlogs)
blogRouter.get('/:id', authMiddleware, fetchBlog)

export default blogRouter