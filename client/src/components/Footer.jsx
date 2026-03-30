import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className='relative bg-white text-gray-600 pt-20 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden border-t border-gray-200'>
            {/* Subtle Pattern Background */}
            <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] ' />

            {/* Top Accent Line */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500' />

            {/* Main Content */}
            <div className='relative z-10'>
                {/* Top Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-10'>
                    {/* Company Info */}
                    <div className='lg:col-span-1'>
                        <img
                            src={assets.luxebookIcon}
                            alt="LuxeBook"
                            className='mb-6 h-12 md:h-16'
                        />
                        <p className='text-gray-600 leading-relaxed mb-6 text-sm'>
                            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
                        </p>

                        {/* Social Links */}
                        <div className='flex items-center gap-3'>
                            <a href="#" className='w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md'>
                                <img src={assets.instagramIcon} alt="Instagram" className='w-5 brightness-0 invert' />
                            </a>
                            <a href="#" className='w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md'>
                                <img src={assets.twitterIcon} alt="Twitter" className='w-5 brightness-0 invert' />
                            </a>
                            <a href="#" className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md'>
                                <img src={assets.facebookIcon} alt="Facebook" className='w-5 brightness-0 invert' />
                            </a>
                            <a href="#" className='w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md'>
                                <img src={assets.linkendinIcon} alt="LinkedIn" className='w-5 brightness-0 invert' />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className='font-playfair text-lg font-bold text-gray-900 mb-6'>Company</h3>
                        <ul className='space-y-3 text-sm'>
                            {['About Us', 'Careers', 'Press', 'Blog', 'Partners'].map((item) => (
                                <li key={item}>
                                    <a href="#" className='text-gray-600 hover:text-orange-600 hover:pl-2 transition-all duration-300 inline-block'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className='font-playfair text-lg font-bold text-gray-900 mb-6'>Support</h3>
                        <ul className='space-y-3 text-sm'>
                            {['Help Center', 'Safety Info', 'Cancellation', 'Contact Us', 'Accessibility'].map((item) => (
                                <li key={item}>
                                    <a href="#" className='text-gray-600 hover:text-orange-600 hover:pl-2 transition-all duration-300 inline-block'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className='font-playfair text-lg font-bold text-gray-900 mb-6'>Newsletter</h3>
                        <p className='text-gray-600 mb-6 text-sm'>
                            Get travel inspiration and exclusive offers.
                        </p>
                        <div className='flex items-center bg-gray-50 rounded-full p-1.5 border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500 transition-all'>
                            <input
                                type="email"
                                className='bg-transparent flex-1 px-4 py-2 outline-none text-gray-900 text-sm placeholder:text-gray-400'
                                placeholder='Your email'
                            />
                            <button className='bg-gradient-to-r from-orange-500 to-pink-500 p-2.5 rounded-full hover:scale-105 transition-transform'>
                                <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='border-t border-gray-200 py-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>
                        <p className='text-gray-600'>
                            © {new Date().getFullYear()} <span className='font-semibold text-gray-900'>LuxeBook</span>. All rights reserved.
                        </p>
                        <p className='font-playfair text-xl text-gray-800 hover:text-orange-600 transition-colors '>
                            Developed by Ankit Sharma
                        </p>
                        <ul className='flex items-center gap-6'>
                            <li><a href="#" className='text-gray-600 hover:text-orange-600 transition-colors'>Privacy</a></li>
                            <li><a href="#" className='text-gray-600 hover:text-orange-600 transition-colors'>Terms</a></li>
                            <li><a href="#" className='text-gray-600 hover:text-orange-600 transition-colors'>Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer