import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'colors'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://akelny.com' : 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Connect to database
connectDB()

// Routes
app.get('/', (req, res) => {
    res.send('Akelny API is running ✅')
})

app.use('/api/users', userRoutes)

// Error handling middlewares
app.use(notFound)
app.use(errorHandler)

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`.yellow.bold)
})
