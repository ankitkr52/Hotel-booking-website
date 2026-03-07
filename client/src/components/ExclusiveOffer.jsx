import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

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
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${item.image})` }}>
                        <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}% OFF</p>
                        <div>
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <p>Expires {item.expiryDate}</p>
                        </div>
                        <button>
                            View offers
                            <img src={assets.arrowIcon} alt="arrow-icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffer
