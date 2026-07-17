import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 
                        "https://hotel-booking-website-brown-gamma.vercel.app";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "₹";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [ShowHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [hotelData, setHotelData] = useState(null);
    const [hotelLoading, setHotelLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [roomsLoading, setRoomsLoading] = useState(true);

    // ==================== FUNCTIONS ====================

    const fetchRooms = async () => {
        try {
            setRoomsLoading(true);
            const { data } = await axios.get('/api/rooms');
            
            if (data.success) {
                setRooms(data.rooms || []);
            } else {
                toast.error(data.message || "Failed to fetch rooms");
                setRooms([]);
            }
        } catch (error) {
            console.error("Fetch rooms error:", error);
            toast.error("Failed to load destinations");
            setRooms([]);
        } finally {
            setRoomsLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/users', { 
                headers: { Authorization: `Bearer ${await getToken()}` } 
            });

            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);

                if (data.role === "hotelOwner") {
                    fetchHotelData();
                } else {
                    setHotelLoading(false);
                }
            } else {
                setTimeout(() => fetchUser(), 5000);
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            toast.error("Failed to fetch user details");
        }
    };

    const fetchHotelData = async () => {
        try {
            const { data } = await axios.get('/api/hotels/my-hotel', { 
                headers: { Authorization: `Bearer ${await getToken()}` } 
            });

            if (data.success) {
                setHotelData(data.hotel);
            } else {
                setHotelData(null);
            }
        } catch (error) {
            console.error("Fetch hotel data error:", error);
            setHotelData(null);
        } finally {
            setHotelLoading(false);
        }
    };

    // ==================== EFFECTS ====================

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, []);

    // ==================== CONTEXT VALUE ====================

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        axios,
        ShowHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        hotelData,
        setHotelData,
        hotelLoading,
        fetchHotelData,
        rooms,
        setRooms,
        roomsLoading,
        fetchRooms
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);