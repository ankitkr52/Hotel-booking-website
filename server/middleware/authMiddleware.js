import User from "../models/User";

// middleware to check if user is authenticated
export const protect=async(req,res,next)=>{
    const {userId}=req.auth;
    // const user=await User.findById(userId);
    if(!user){
        return res.status(401).json({success:false,message:"User not found"});
    }
    else{
        const user= await User.findById(userId);
        req.user=user;
        next();
    }
    req.user=user;
    next();
}