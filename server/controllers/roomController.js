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

// API to toggel availabity of a room 

export const toggelRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body
        const roomData = await Room.findById(roomId)
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save()
        res.json({ success: true, message: "Room availability update " })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}