import { Router } from "express"
import { createPost } from "../controllers/posts.controllers.js"

const router = Router()

router.post("/posts", createPost)

export default router
