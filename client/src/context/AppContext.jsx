
import axios from 'axios'
import { useContext } from 'react'
import { createContext } from 'react'
import { useNavigate } from "react-router-dom"
import { useUser, useAuth } from '@clerk/clerk-react'
import { useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const AppContext = createContext()

export const Appprovider = ({ Children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$"
    const navigate = useNavigate()
    const { user } = useUser()
    const { getToken } = useAuth()

    const [isOwner, setIsOwner] = useState(false)
    const [ShowHotelReg, setShowHotelReg] = useState(false)

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if(data.success){
                setIsOwner(data.role==="hotelOwner");
            }
        } catch (error) {

        }
    }

    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, ShowHotelReg, setShowHotelReg
    }
    return (
        <AppContext.Provider value={ }>
            {Children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)