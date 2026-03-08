import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffer = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row items-center justify-between w-full mb-16'>
                <Title 
                    align='left' 
                    title='Exclusive Offers' 
                    subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories." 
                />
                <button className='group flex items-center gap-2 font-semibold text-gray-700 hover:text-black cursor-pointer transition-colors max-md:mt-8'>
                    View All Offers
                    <img
                        src={assets.arrowIcon}
                        alt="arrow-icon"
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    />
                </button>
            </div>

            {/* Offers Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                {exclusiveOffers.map((item) => (
                    <div 
                        key={item._id} 
                        className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
                    >
                        {/* Background Image with Overlay */}
                        <div 
                            className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110'
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500' />
                        
                        {/* Shine Effect */}
                        <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent' />
                        
                        {/* Content */}
                        <div className='relative flex flex-col justify-between min-h-[320px] p-6 text-white'>
                            {/* Discount Badge - ORANGE ON HOVER */}
                            <div className='flex justify-start'>
                                <span className='inline-block px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full shadow-lg group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300'>
                                    {item.priceOff}% OFF
                                </span>
                            </div>
                            
                            {/* Spacer */}
                            <div className='flex-1' />
                            
                            {/* Text Content */}
                            <div className='space-y-3'>
                                <h3 className='text-3xl font-bold font-playfair group-hover:text-white transition-colors'>
                                    {item.title}
                                </h3>
                                <p className='text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors'>
                                    {item.description}
                                </p>
                                <p className='text-xs text-white/60 group-hover:text-white/80 transition-colors'>
                                    ⏰ Expires {item.expiryDate}
                                </p>
                            </div>
                            
                            {/* CTA Button */}
                            <button className='flex items-center gap-2 mt-6 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300'>
                                View Offer Details
                                <img 
                                    className='invert w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' 
                                    src={assets.arrowIcon} 
                                    alt="arrow-icon" 
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffer