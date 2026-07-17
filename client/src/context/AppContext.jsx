import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useUser, useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 
                        "https://hotel-booking-website-brown-gamma.vercel.app";

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "₹"
    const navigate = useNavigate()
    const { user } = useUser()
    const { getToken } = useAuth()

    const [isOwner, setIsOwner] = useState(false)
    const [ShowHotelReg, setShowHotelReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [hotelData, setHotelData] = useState(null)
    const [hotelLoading, setHotelLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [roomsLoading, setRoomsLoading] = useState(true)

    // ==================== DEBUGGING ====================
    console.log("=== AppContext Debug ===")
    console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL)
    console.log("Axios Base URL:", axios.defaults.baseURL)
    console.log("Current User:", user?.id || "No user")
    // ===================================================

    const fetchRooms = async () => {
        try {
            setRoomsLoading(true)
            console.log("Fetching rooms from:", axios.defaults.baseURL + "/api/rooms")  // Debug log

            const { data } = await axios.get('/api/rooms')
            
            console.log("Rooms API Response:", data)   // Debug log

            if (data.success) {
                setRooms(data.rooms || [])
            } else {
                toast.error(data.message || "Failed to fetch rooms")
                setRooms([])
            }
        } catch (error) {
            console.error("🚨 Fetch rooms error:", error)
            console.error("Error Response:", error.response?.data)  // Important
            toast.error("Failed to load destinations")
            setRooms([])
        } finally {
            setRoomsLoading(false)
        }
    }

    // Baaki functions (fetchUser, fetchHotelData) same rakh sakte ho

    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, 
        ShowHotelReg, setShowHotelReg, searchedCities, setSearchedCities, 
        hotelData, setHotelData, hotelLoading, fetchHotelData, 
        rooms, setRooms, roomsLoading, fetchRooms
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)