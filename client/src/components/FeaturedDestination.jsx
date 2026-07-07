import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
    const { rooms, roomsLoading, navigate } = useAppContext()

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

    if (rooms.length === 0) {
        return null // or show "No destinations available"
    }

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Title title="Featured Destinations" subTitle="Discover our handpicked selection of exceptional properties..." />
            
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {rooms.slice(0, 4).map((room, index) => (
                    <HotelCard
                        key={room._id} 
                        room={room} 
                        index={index} 
                    />
                ))}
            </div>

            <button 
                onClick={() => { navigate('/rooms'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className='px-6 py-3 mt-10 bg-gray-900 text-white font-semibold rounded-full hover:bg-orange-500 hover:scale-105 transition-all duration-300'
            >
                View All Destinations
            </button>
        </div>
    )
}
export default FeaturedDestination