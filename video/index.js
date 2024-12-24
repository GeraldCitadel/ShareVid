import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'
import router from './src/route.js'





// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api', router)


// app.get('/', (req, res) => {
//    res.send('API working')
// })






app.listen(port, () => console.log(`server running on port ${port}`))