import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(cors())
app.use(express.json())

app.post("/webhooks/clerk", clerkWebhooks)

app.get('/', (req, res) => res.send("API is working here"))
app.use("/api/users",userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running")
})

export default app;