import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className="bg-[#F6F9FC] px-6 md:px-16 lg:px-24 xl:px-32">
            <div className=" flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/80 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="dummyLogoColored" />
                    <p className="max-w-102.5 mt-6">Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.</p>
                </div>
                <div className='flex items-center gap-3 mt-4'>
                    <img src={assets.instagramIcon} alt="instagram" className='w-6' />

                    <img src={assets.twitterIcon} alt="twittericon" className='w-6' />
                    <img src={assets.facebookIcon} alt="facebookicon" className='w-6' />
                    <img src={assets.linkendinIcon} alt="linkdinicon" className='w-6' />

                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright 2025 © <a href="https://prebuiltui.com">PrebuiltUI</a> All Right Reserved.
            </p>
        </div>
    )
}

export default Footer
