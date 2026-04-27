import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <div className='relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='absolute top-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse' />
      <div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 animate-pulse' style={{ animationDelay: '1s' }} />

      {/* Title Section */}
      <div className='max-w-3xl text-center mb-20 z-10'>
        <div className='inline-block px-4 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full mb-6 shadow-lg'>
          ⭐ GUEST TESTIMONIALS
        </div>
        <Title
          title="What Our Guests Say"
          subTitle="Discover why discerning travelers choose QuickStay for their luxury accommodations around the world."
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Gradient Background on Hover */}
            <div className='absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            {/* Quote Icon Background */}
            <div className='absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300'>
              <svg className='w-20 h-20 text-orange-500' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
              </svg>
            </div>

            {/* Content */}
            <div className='relative z-10'>
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className='relative'>
                  <img
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-100 group-hover:ring-orange-500 transition-all duration-300"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  {/* Verified Badge */}
                  <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <p className="font-playfair text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                    </svg>
                    {testimonial.address}
                  </p>
                </div>
              </div>

              {/* Star Rating with Shadow */}
              <div className="flex items-center gap-1 mb-5 group-hover:scale-105 transition-transform duration-300">
                <StarRating />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed text-base relative">
                <span className='text-orange-500 text-2xl font-serif absolute -left-2 -top-1'>"</span>
                <span className='ml-4'>{testimonial.review}</span>
                <span className='text-orange-500 text-2xl font-serif'>"</span>
              </p>

              {/* Divider */}
              <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className='mt-16 text-center'>
        <p className='text-gray-600 mb-4'>Join thousands of satisfied guests</p>
        <button className='px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          Share Your Experience
        </button>
      </div>
    </div>
  )
}

export default Testimonial