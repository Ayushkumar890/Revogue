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

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: ['https://revogue.onrender.com'],
  credentials: true
}))

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const frontendPath = path.join(__dirname, '../frontend/dist')
const adminPath = path.join(__dirname, '../admin/dist')

// Serve main frontend
app.use(express.static(frontendPath))
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Serve admin frontend
app.use('/admin', express.static(adminPath))
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'))
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ error: 'Something went wrong!' })
})

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})
