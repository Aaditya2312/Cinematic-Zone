import dotenv from "dotenv"
import express from "express";
import "./db/conn.mjs"
import router from "./router/auth.mjs"

const app = express()
dotenv.config({path:'./config.env'})
app.use(express.json())
app.use(router)


app.get('/', (req,res) => {
    res.send(`hello from server`)
})

app.listen(5000, () => {
    console.log(`Server running`)
})