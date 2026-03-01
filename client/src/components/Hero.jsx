import React from 'react'
import heroImage from '../assets/heroImage.png'  // ✅ Import

const Hero = () => {
  return (
    <div 
      className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen'
      style={{ backgroundImage: `url(${heroImage})` }}  // ✅ Inline style
    >
      {/* content */}
    </div>
  )
}

export default Hero
