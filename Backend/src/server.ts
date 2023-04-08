/// <reference path="../global.d.ts" />

import express, { Application, Request, Response } from "express"
import cors from "cors"
import connectToMongoDB from "./database/connection"
import userRoutes from "./routes/userRoutes"
import researchPaperRoutes from "./routes/researchPaperRoutes"
import plagiarismRoutes from "./routes/plagiarismRoutes"

const app: Application = express()
const PORT = process.env.PORT || 5000
connectToMongoDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send("Working Fine!!")
})

app.use('/user', userRoutes)
app.use('/researchpaper', researchPaperRoutes)
app.use('/plagiarism', plagiarismRoutes)

app.listen(PORT, () => {
    console.log(`App Listening at PORT=${PORT} and BASEURL=http://localhost:${PORT}`)
})
