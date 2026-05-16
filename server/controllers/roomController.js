// API to create a new room for hotel

import Hotel from "../models/Hotel"

export const createRoom = async (req, res) => {
    try {
        const { roonType, pricePerNight, amenities }=req.body
        const hotel=await Hotel.findOne({owner:req.auth.userId})
        if(!hotel){
            return res.json({success:false,message:"No Hotel Found"})
        }
    } catch (error) {

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