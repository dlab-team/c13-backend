import express from "express"
import cors from "cors"
import { ORIGIN } from "./config.js"

import postRoutes from "./routes/posts.routes.js"

const app = express()

// 1º middlewares
app.use(express.json())
app.use(
  cors({
    origin: [ORIGIN],
    credentials: true,
  })
)

// 2º Routes
app.use("/api", postRoutes)

export { app }
