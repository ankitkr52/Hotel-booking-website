// API to create a new room for hotel
import Hotel from "../models/Hotel.js"
import { v2 as cloudinary } from "cloudinary"
import Room from "../models/Room.js"

export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body
        const hotel = await Hotel.findOne({ owner: req.user._id })
        if (!hotel)
            return res.json({ success: false, message: "No Hotel Found" })
        // upload image to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path)
            return response.secure_url;
        })
        // wait for all upload to complete
        const images = await Promise.all(uploadImages)
        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,

        })
        res.json({ success: true, message: "Room Created Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

// API to get all room 

export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 })
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// API to get all room for specific hotel

export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.user._id })
        if (!hotelData) return res.json({ success: false, message: "No Hotel Found" })
        const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel")
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to toggle availability of a room

export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body
        if (!roomId) {
            return res.status(400).json({ success: false, message: "roomId is required" })
        }

        const roomData = await Room.findById(roomId)
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found" })
        }

        const hotelData = await Hotel.findOne({ owner: req.user._id })
        if (!hotelData || roomData.hotel.toString() !== hotelData._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this room" })
        }

        roomData.isAvailable = !roomData.isAvailable
        await roomData.save()

        res.json({ success: true, message: "Room availability updated", room: roomData })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}