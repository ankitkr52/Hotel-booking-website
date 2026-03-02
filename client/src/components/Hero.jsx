import React from 'react'
import heroImage from '../assets/heroImage3.png'

const Hero = () => {
    return (
        <div
            className='flex flex-col items-start justify-center px-4 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen w-full'
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experiance </p>
            <h1 className='text-4xl md:text-6xl font-bold'>Discover Your Perfect Gateway Destination</h1>
            <p>Unparalleled luxury and comfort await at the world's most exclusive
                hotels and resorts. Start your journey today.</p>
            <button className='mt-6 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition'>
                Explore Now
            </button>
        </div>
    )
}

export default Hero