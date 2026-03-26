import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData } from '../assets/assets'


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
                     hover:text-orange-600 hover:scale-105 transition-all duration-300 
                     cursor-default inline-block'>{room.hotel.name} <span className='font-inter text-sm'>{room.roomType}</span></h1>
       <p className="text-xs font-inter py-1.5 px-3 rounded-full bg-green-500 text-black mt-4">
          20% OFF
        </p>
      </div>

    </div>
  )
}

export default RoomDetails
