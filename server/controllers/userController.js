
// get/api/users
import User from "../models/User.js";

export const getUsersData = async (req, res) => {
   try {
    const role=req.user.role;
    const recentSearchedCities=req.user.recentSearchedCities;
    res.json({success:true,role,recentSearchedCities});
   } catch (error) {
    res.json({success:false,message:error.message});
   }
}

// store recent searched cities
export const storeRecentSearchedCities=async(req,res)=>{
    try {
        const {recentSearchedCities}=req.body;
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}