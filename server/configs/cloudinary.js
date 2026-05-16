import {v2 as cloudinary} from "cloudinary"

const connectCloudinary=async(req,res)=>{
     cloudinary.config({
        CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY:process.env.CLOUDINARY_API_KEY,
        API_SECRET:process.env.CLOUDINARY_API_SECRET
     })
}
export default connectCloudinary