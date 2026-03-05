import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const ExclusiveOffer = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full' >
                <Title align='left' title='Exclusive Offers' subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgatable memories." />
                <button className='group flex items-center gap-2 font-medium text-gray-600 hover:text-black cursor-pointer transition-colors max-md:mt-12'>
                    View All Offers
                    <img
                        src={assets.arrowIcon}
                        alt="arrow-icon"
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    />
                </button>
            </div>
            <div>
                card section
            </div>
        </div>
    )
}

export default ExclusiveOffer
