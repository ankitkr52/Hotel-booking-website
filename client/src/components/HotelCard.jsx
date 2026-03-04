import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
    return (
        <Link 
            to={'/rooms/' + room.id} 
            onClick={() => window.scrollTo(0, 0)} 
            className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative">
                <img src={room.images[0]} alt={room.name} className="w-full h-48 object-cover" />
                
                {/* Best Seller Badge */}
                {index % 2 === 0 && (
                    <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
                        Best seller
                    </p>
                )}
            </div>
            
            {/* Card Content */}
            <div className='p-4 pt-5'>
                {/* Hotel Name & Rating - Separate Row */}
                <div className='flex items-center justify-between mb-2'>
                    <p className='font-playfair text-xl font-medium text-gray-800'>
                        {room.hotel.name}
                    </p>
                    <div className='flex items-center gap-1'>
                        <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" />
                        <span>4.5</span>
                    </div>
                </div>
                
                {/* Location - Separate Row */}
                <div className='flex items-center gap-1 text-sm mb-4'>
                    <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
                    <span>{room.hotel.address}</span>
                </div>
                
                {/* Price & Button - Separate Row */}
                <div className='flex items-center justify-between mt-4'>
                    <p className='text-xl text-gray-800 font-medium'>
                        <span>${room.pricePerNight}</span>/Night
                    </p>
                    <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-green-500 hover:text-white transition-all cursor-pointer'>
                        Book Now
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard
