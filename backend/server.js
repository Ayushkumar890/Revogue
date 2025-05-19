import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
// App Config
const app = express()
const port = process.env.PORT || 4000

// Connect to DB and Cloudinary
connectDB()
connectCloudinary()

// Middleware setup
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: ['https://revogue.onrender.com'], // or your frontend domain
  credentials: true // Allow cookies to be sent
}))

// API Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Root Route


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const __frontendPath = path.join(__dirname, '../frontend/dist')

app.use(express.static(__frontendPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(__frontendPath, 'index.html'))
})

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ error: 'Something went wrong!' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})
