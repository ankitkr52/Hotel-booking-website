import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Razorpay from 'razorpay'


// Function to check Avability of rooms
const checkAvailability = async ({ checkInDate, checkOutDate, roomId }) => {
    try {
        const bookings = await Booking.find({
            room: roomId,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvailable = bookings.length === 0
        return isAvailable;
    } catch (error) {
        console.log(error.message)
    }
}

// API  to check avability of room
// post/api/bookings/check-Avability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, roomId })
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// API to create new booking
// post/api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate, guests } = req.body
        const user = req.user._id
        // before booking check avability
        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, roomId
        });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not Available" })
        }
        // get total price for room
        const roomData = await Room.findById(roomId).populate("hotel");
        let totalPrice = roomData.pricePerNight;
        // calculate the total price based on  nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)

        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

        totalPrice *= nights
        const booking = await Booking.create({
            user, room: roomId, hotel: roomData.hotel._id, guests: +guests, checkInDate, checkOutDate, totalPrice
        })
        const mailOptions = {
            from: {
                name: 'LuxeBook',
                address: process.env.SENDER_EMAIL
            },
            to: req.user.email,
            subject: "🏨 Booking Confirmed - LuxeBook",
            html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            }
            .header {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                letter-spacing: 2px;
            }
            .header p {
                margin: 8px 0 0;
                opacity: 0.8;
                font-size: 14px;
            }
            .badge {
                display: inline-block;
                background: #f97316;
                color: white;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-top: 12px;
            }
            .body {
                padding: 35px 30px;
            }
            .greeting {
                font-size: 18px;
                color: #1a1a2e;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .subtitle {
                color: #666;
                font-size: 14px;
                margin-bottom: 28px;
            }
            .booking-card {
                background: #f8f9ff;
                border: 1px solid #e8eaf6;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 24px;
            }
            .booking-card h3 {
                margin: 0 0 16px;
                color: #1a1a2e;
                font-size: 16px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
                font-size: 14px;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                color: #888;
                font-weight: 500;
            }
            .detail-value {
                color: #1a1a2e;
                font-weight: 600;
                text-align: right;
            }
            .total-row {
                background: #1a1a2e;
                color: white;
                padding: 14px 20px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                margin-top: 16px;
                font-size: 16px;
                font-weight: 700;
            }
            .cta-button {
                display: block;
                width: fit-content;
                margin: 24px auto;
                background: #f97316;
                color: white;
                padding: 14px 32px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: 600;
                font-size: 15px;
                text-align: center;
            }
            .footer {
                background: #f8f9ff;
                padding: 24px 30px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #eee;
            }
            .footer a {
                color: #f97316;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">

            <!-- HEADER -->
            <div class="header">
                <h1>✦ LUXEBOOK</h1>
                <p>Premium Hotel Booking Experience</p>
                <span class="badge">✅ Booking Confirmed</span>
            </div>

            <!-- BODY -->
            <div class="body">
                <p class="greeting">Dear ${req.user.username},</p>
                <p class="subtitle">
                    Thank you for choosing LuxeBook! Your booking has been confirmed. 
                    Here are your booking details:
                </p>

                <!-- BOOKING DETAILS CARD -->
                <div class="booking-card">
                    <h3>📋 Booking Details</h3>

                    <div class="detail-row">
                        <span class="detail-label">Booking ID</span>
                        <span class="detail-value">#${booking._id}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Hotel Name</span>
                        <span class="detail-value">${roomData.hotel.name}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Room Type</span>
                        <span class="detail-value">${roomData.roomType}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${roomData.hotel.address}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Check-in</span>
                        <span class="detail-value">
                            ${booking.checkInDate.toDateString()}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Check-out</span>
                        <span class="detail-value">
                            ${booking.checkOutDate.toDateString()}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Guests</span>
                        <span class="detail-value">${booking.guests}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Payment Method</span>
                        <span class="detail-value">${booking.paymentMethod}</span>
                    </div>

                </div>

                <!-- TOTAL AMOUNT -->
                <div class="total-row">
                    <span>Total Amount</span>
                    <span>${process.env.CURRENCY || '₹'} ${booking.totalPrice}</span>
                </div>

                <!-- CTA BUTTON -->
                <a href="${process.env.FRONTEND_URL}/my-bookings" class="cta-button">
                    View My Bookings →
                </a>

                <p style="color:#666; font-size:13px; text-align:center; margin-top:16px;">
                    If you need to make any changes, feel free to contact us.<br/>
                    We look forward to welcoming you! 🏨
                </p>
            </div>

            <!-- FOOTER -->
            <div class="footer">
                <p>© 2026 LuxeBook. All rights reserved.</p>
                <p>
                    <a href="#">Privacy Policy</a> · 
                    <a href="#">Terms of Service</a> · 
                    <a href="#">Contact Support</a>
                </p>
                <p style="margin-top:8px;">
                    You received this email because you made a booking on LuxeBook.
                </p>
            </div>

        </div>
    </body>
    </html>
    `
        }

        await transporter.sendMail(mailOptions)




        res.json({ success: true, message: "Booking creates successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to get all booking for users
// get/api/booking/users
export const getUsersBookings = async (req, res) => {
    try {
        const user = req.user._id
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id })
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel Found" })
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 })
        // total bookings
        const totalBookings = bookings.length
        // total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const createRazorpayOrder = async (req, res) => {
    try {
        const { bookingId } = req.body

        
        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.json({ success: false, message: "Booking not found" })
        }

        if (booking.isPaid) {
            return res.json({ success: false, message: "Already paid" })
        }

        // 
        const roomData = await Room.findById(booking.room).populate('hotel')

        
        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        // ✅ Order banao — Razorpay ka sahi API
        const order = await razorpayInstance.orders.create({
            amount: booking.totalPrice * 100,  // paise mein
            currency: "INR",
            receipt: `booking_${bookingId}`,
            notes: {
                bookingId: bookingId.toString(),
                hotelName: roomData.hotel.name,
                roomType: roomData.roomType
            }
        })

        res.json({ 
            success: true, 
            order,
            key: process.env.RAZORPAY_KEY_ID  
        })

    } catch (error) {
        res.json({ success: false, message: error.message })  
    }
}