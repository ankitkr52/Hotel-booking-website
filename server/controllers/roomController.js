// API to create a new room for hotel
import Hotel from "../models/Hotel.js"
import { v2 as cloudinary } from "cloudinary"
import Room from "../models/Room.js"

export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body
        const hotel = await Hotel.findOne({ owner: req.auth.userId })
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

}

// API to get all room for specific hotel

export const getOwnerRooms = async (req, res) => {

}

// API to toggel availabity of a room 

export const toggelRoomAvailability = async (req, res) => {

}