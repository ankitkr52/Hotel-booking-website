import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL 
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


    const fetchRooms = async () => {
        try {
            setRoomsLoading(true);
            const { data } = await axios.get('/api/rooms');

            if (data?.success) {
                setRooms(data.rooms || []);
            } else {
                toast.error(data?.message || "Failed to fetch rooms");
                setRooms([]);
            }
        } catch (error) {
            console.error("🚨 Fetch rooms error:", error);
            console.error("Response:", error.response?.data);
            
            const errorMsg = error.response?.data?.message || 
                           error.message || 
                           "Failed to load destinations";
            
            toast.error(errorMsg);
            setRooms([]);
        } finally {
            setRoomsLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data?.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);

                if (data.role === "hotelOwner") {
                    await fetchHotelData();
                } else {
                    setHotelLoading(false);
                }
            } else {
                toast.error(data?.message || "Failed to fetch user data");
                setTimeout(() => fetchUser(), 5000); // retry
            }
        } catch (error) {
            console.error("🚨 Fetch user error:", error);
            console.error("Response:", error.response?.data);
            
            toast.error(error.response?.data?.message || "Failed to load user details");
        }
    };

    const fetchHotelData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/hotels/my-hotel', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data?.success) {
                setHotelData(data.hotel);
            } else {
                setHotelData(null);
                toast.error(data?.message || "Failed to fetch hotel data");
            }
        } catch (error) {
            console.error("🚨 Fetch hotel data error:", error);
            console.error("Response:", error.response?.data);
            setHotelData(null);
            toast.error(error.response?.data?.message || "Failed to load hotel details");
        } finally {
            setHotelLoading(false);
        }
    };

    

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, []);

    

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