import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

connectDB();

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API is working here"))

export default app;