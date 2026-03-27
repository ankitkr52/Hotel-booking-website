import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'


const RoomDetails = () => {
  const { id } = useParams()
  const [room, setroom] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const room = roomsDummyData.find(room => room._id === id)
    room && setroom(room)
    room && setMainImage(room.images[0])
  }, [])
  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* room details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair text-4xl md:text-5xl font-playfair font-semibold text-gray-900 
                     hover:text-orange-600 hover:scale-95 transition-all duration-300 
                     cursor-default inline-block'>{room.hotel.name} <span className='font-inter text-sm ml-2'>{room.roomType}</span></h1>
        <p className="text-xs font-inter py-1.5 px-3 rounded-full bg-green-500 text-white ml-4">
          20% OFF
        </p>
      </div>
      {/* room raiting */}
      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>
      {/* room address */}
      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel.address}</span>
      </div>
      {/* room immages */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt="Room image" className='w-full rounded-xl shadow-lg object-cover' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room?.images.length > 1 && room.images.map((image, index) => (
            <img onClick={() => setMainImage(image)} key={index} src={image} alt="Room image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
          ))}
        </div>

      </div>
      {/* Room highlights */}
     {/* Room Highlights Section */}
<div className="mt-16">
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
    
    {/* Left Side - Title + Amenities */}
    <div className="flex-1">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-gray-900 leading-tight">
        Experience Luxury Like Never Before
      </h1>

      {/* Amenities */}
      <div className="mt-8">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4">
          ROOM AMENITIES
        </p>
        
        <div className="flex flex-wrap gap-3">
          {room.amenities.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 bg-white border border-gray-200 
                         hover:border-orange-200 hover:bg-orange-50 
                         px-5 py-3 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-orange-100 
                            text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                <img 
                  src={facilityIcons[item]} 
                  alt={item} 
                  className="w-5 h-5" 
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Side - Price */}
    <div className="lg:text-right flex-shrink-0">
      <p className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-1">
        STARTING FROM
      </p>
      <p className="text-5xl md:text-6xl font-semibold text-gray-900">
        ${room.pricePerNight}
        <span className="text-xl font-normal text-gray-400">/night</span>
      </p>
      
      {/* Optional: Small note */}
      <p className="text-sm text-green-500 mt-3">
        Taxes and fees included
      </p>
    </div>

  </div>
</div>
      {/* checkin checkout form */}
      <form
        className="flex flex-col lg:flex-row items-center justify-between 
             bg-white shadow-xl shadow-gray-200/80 p-8 rounded-2xl 
             mx-auto mt-16 max-w-6xl border border-gray-100"
      >

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full lg:w-auto">

          {/* Check-In */}
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="checkInDate" className="font-medium text-gray-700 text-sm tracking-wide">
              CHECK-IN
            </label>
            <input
              type="date"
              id="checkInDate"
              className="mt-2 w-full md:w-56 px-4 py-3 rounded-xl border border-gray-300 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                   outline-none transition-all text-gray-700"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="checkOutDate" className="font-medium text-gray-700 text-sm tracking-wide">
              CHECK-OUT
            </label>
            <input
              type="date"
              id="checkOutDate"
              className="mt-2 w-full md:w-56 px-4 py-3 rounded-xl border border-gray-300 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                   outline-none transition-all text-gray-700"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="guests" className="font-medium text-gray-700 text-sm tracking-wide">
              GUESTS
            </label>
            <input
              type="number"
              id="guests"
              min="1"
              placeholder="2"
              className="mt-2 w-full md:w-32 px-4 py-3 rounded-xl border border-gray-300 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                   outline-none transition-all text-gray-700"
              required
            />
          </div>

        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          className="mt-8 lg:mt-0 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 
               text-white font-semibold text-lg px-12 py-4 rounded-2xl 
               transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/30 
               hover:shadow-xl hover:shadow-orange-500/40 w-full lg:w-auto"
        >
          Book Now
        </button>

      </form>




    </div>
  )
}

export default RoomDetails
