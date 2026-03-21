import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const NewsLetter = () => {
    return (
        <div className="relative flex flex-col items-center max-w-6xl lg:w-full rounded-3xl px-8 py-16 md:py-20 mx-4 lg:mx-auto my-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden shadow-2xl">
            {/* Decorative Background Elements */}
            <div className='absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse' />
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}} />
            
            {/* Grid Pattern Overlay */}
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]' />
            
            {/* Shine Effect */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50' />
            
            {/* Content */}
            <div className='relative z-10 w-full flex flex-col items-center'>
                {/* Icon/Badge */}
                <div className='mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm'>
                    <span className='text-orange-400 text-sm font-semibold flex items-center gap-2'>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                        </svg>
                        NEWSLETTER
                    </span>
                </div>

                {/* Title */}
                <div className='max-w-3xl'>
                    <Title 
                        title="Stay Inspired" 
                        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration" 
                    />
                </div>

                {/* Form */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full max-w-2xl">
                    <div className='relative flex-1 w-full group'>
                        {/* Glow Effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity duration-500' />
                        
                        {/* Input */}
                        <input 
                            type="email" 
                            className="relative bg-white/10 backdrop-blur-sm px-6 py-4 border border-white/20 rounded-xl outline-none w-full text-white placeholder:text-gray-400 focus:border-orange-500/50 focus:bg-white/15 transition-all duration-300" 
                            placeholder="Enter your email address" 
                        />
                    </div>
                    
                    {/* Button */}
                    <button className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/50 active:scale-95 transition-all duration-300 overflow-hidden sm:w-auto w-full">
                        {/* Shine Effect on Button */}
                        <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent' />
                        
                        <span className='relative z-10'>Subscribe</span>
                        <svg className='relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </button>
                </div>

                {/* Privacy Text */}
                <p className="text-gray-400 mt-8 text-sm text-center max-w-xl leading-relaxed">
                    By subscribing, you agree to our{' '}
                    <a href="#" className='text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors'>
                        Privacy Policy
                    </a>
                    {' '}and consent to receive updates.
                </p>
                {/* Trust Indicators */}
                <div className='flex items-center gap-6 mt-8 text-gray-400 text-xs'>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span>No spam</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span>Unsubscribe anytime</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span>10k+ subscribers</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter