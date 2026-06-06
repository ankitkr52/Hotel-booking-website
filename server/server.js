import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB();
connectCloudinary()

const app = express();

app.use(cors())
// middleware

app.use(express.json())
app.use(clerkMiddleware())
app.post("/webhooks/clerk", clerkWebhooks)

// routing 
app.get('/', (req, res) => res.send("API is working here"))
app.use("/api/users", userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)



// server 
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running")
})

export default app;