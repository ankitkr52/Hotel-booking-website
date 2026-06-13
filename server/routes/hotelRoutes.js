import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { registerHotel, getOwnerHotel } from '../controllers/hotelController.js'

const hotelRouter = express.Router()

hotelRouter.post("/", protect, registerHotel)
hotelRouter.get("/my-hotel", protect, getOwnerHotel)

export default hotelRouter;