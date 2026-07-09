import React, { useState, useEffect } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'

import { useAppContext } from '../context/AppContext'

const RecomandedHotel = () => {
    const { rooms, roomsLoading, searchedCities } = useAppContext()
    const [recommended, setRecommended] = useState([])

   const filterHotels = () => {
    if (searchedCities.length === 0) {
        setRecommended(rooms.slice(0, 4))  // ✅ sab rooms dikhao
        return
    }
    const filteredHotels = rooms
        .slice()
        .filter(room => searchedCities.includes(room.hotel.city))
    setRecommended(filteredHotels)
}

    useEffect(()=>{
        filterHotels()
    }, [rooms, searchedCities])

    if (roomsLoading) {
        return (
            <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
                <Title title="Featured Destinations" subTitle="Discover our handpicked selection..." />
                <div className="py-20 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
                </div>
            </div>
        )
    }

    if (recommended.length === 0) {
        return null // or show "No destinations available"
    }

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Title title="Recommended Hotels" subTitle="Discover our handpicked selection of exceptional properties..." />

            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard
                        key={room._id}
                        room={room}
                        index={index}
                    />
                ))}
            </div>

            
        </div>
    )
}
export default RecomandedHotel;