import express from 'express'
import userRouter from './routes/userRoute.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.connect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import path from 'path'
const app = express()
dotenv.config()
const PORT = process.env.PORT | 4000
app.use(cookieParser())

// app.use(cors(
//     {
//         origin: ['http://localhost:3000'],
//     }
// ))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use('/api',userRouter)
app.use(notFound)
app.use(errorHandler)
// if(process.env.NODE_ENV=='production'){
//     const __dirname= path.resolve()
//     app.use(express.static(path.join(__dirname,'fontend/dist')))
//     app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'fontend','dist','index.html'))
//     )
// }else{
//     app.get('/',
//         (req, res) => {
//             res.send('Server is running')
//         }
//     )
// }
app.listen(PORT,()=>{
    console.log(PORT);
    
    connectDB()
})