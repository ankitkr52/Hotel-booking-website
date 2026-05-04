import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'

connectDB();

const app = express();
app.use(cors())  // enable cross origin resorce sharing

// middleware 
app.use(express.json())  // parse incoming json data
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send("API is working here"))

const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))