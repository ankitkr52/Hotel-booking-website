import Booking from "../models/Booking.js";


// Function to check Avability of rooms
const checkAvailability = async ({ checkInDate, checkOutDate, roomId }) => {
    try {
        const bookings = await Booking.find({
            room: roomId,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvailable = bookings.length === 0
        return isAvailabele;
    } catch (error) {
        console.log(error.message)
    }
}

// API  to check avability of room
// post/api/bookings/check-Avability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate } = req.body;
        const isAvailabele = await checkAvailability({ checkInDate, checkOutDate, roomId })
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}