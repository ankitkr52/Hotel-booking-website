import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
    return (
        <Link
            to={`/rooms/${room._id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group relative max-w-70 w-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-3 transition-all duration-500 ease-out"
        >
            {/* Image Container with Overlay */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                />

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                {/* Shine Effect */}
               <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-all duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 via-50% to-transparent" />

                {/* Best Seller Badge with Glow */}
                {index % 2 === 0 && (
                    <p className='px-3 py-1.5 absolute top-3 left-3 text-xs bg-white text-gray-800 font-semibold rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300'>
                        ⭐ Best seller
                    </p>
                )}
            </div>

            {/* Card Content */}
            <div className='p-5 bg-gradient-to-b from-white to-gray-50/50 group-hover:from-gray-50 group-hover:to-white transition-colors duration-500'>
                Hotel Name & Rating
                <div className='flex items-center justify-between mb-3'>
                    <p className='font-playfair text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300'>
                        {room.hotel.name}
                    </p>
                    <div className='flex items-center gap-1.5 bg-orange-50 px-2.5 py-1.5 rounded-xl group-hover:bg-orange-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm'>
                        <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" />
                        <span className="font-bold text-sm">4.5</span>
                    </div>
                </div>

                {/* Location */}
                <div className='flex items-center gap-2 text-sm mb-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300'>
                    <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{room.hotel.address}</span>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5 group-hover:via-gray-300 transition-colors duration-500" />

                {/* Price & Button */}
                <div className='flex items-center justify-between'>
                    <div>
                        <p className="text-xs text-gray-500 mb-1 group-hover:text-gray-600 transition-colors">Starting from</p>
                        <p className='text-2xl font-bold text-gray-900 group-hover:text-black group-hover:scale-105 transition-all duration-300 origin-left'>
                            ${room.pricePerNight}
                            <span className="text-sm font-normal text-gray-500">/night</span>
                        </p>
                    </div>
                    <button className='px-5 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-full hover:bg-green-400 hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95'>
                        Book Now
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard