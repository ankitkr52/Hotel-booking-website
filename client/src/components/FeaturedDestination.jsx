import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title title="Featured Destinations" subTitle="Discover our handpicked selection of exceptional properties around the world offering unparalleled luxury and unforgettable experiences." />
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard room={room} index={index} key={room._id} />
        ))}

      </div>
      <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
        className='px-6 py-3 mt-10 bg-gray-900 text-white font-semibold rounded-full hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestination
