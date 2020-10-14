import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from "mongoose"
import morgan from 'morgan'

import router from './router.js'
import userRouter from './controllers/UserController.js'

const app= express()

//connecy to DB
// Connect to DB
mongoose.connect(process.env.MONGODB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
})

// mongoose.connect('mongodb+srv://admin:admin1@digitalent.5ltj4.mongodb.net/<dbname>?retryWrites=true&w=majority',
// {
//     useNewUrlParser:true,
//     useUnifiedTopology: true,
// },
// ()=>{
//     console.log('connect DB success')
// })

//middlewares
app.use(morgan('dev'));
app.use(express.json())

//routes
app.get("/", (req,res,next)=>{
res.json({
    message:'success'
})
})
// use api/user
app.use('/api', router)
app.use('/api/user', userRouter)

const PORT=process.env.PORT || '4000'
app.listen(PORT, ()=>{
    console.log(`App listen to port ${PORT}`)
})