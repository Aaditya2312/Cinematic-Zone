import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log(`connection done`)
}).catch((err)=>{
    console.log(`connection not done`)
})