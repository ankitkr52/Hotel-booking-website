import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer group py-2'>
            <div className='relative'>
                <input 
                    type="checkbox" 
                    checked={selected} 
                    onChange={(e) => onChange(e.target.checked, label)}
                    className='peer sr-only'
                />
                <div className='w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-gradient-to-br peer-checked:from-orange-500 peer-checked:to-pink-500 peer-checked:border-transparent transition-all duration-300 flex items-center justify-center'>
                    <svg className='w-3 h-3 text-white opacity-0 peer-checked:opacity-100' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                </div>
            </div>
            <span className='text-sm text-gray-700 group-hover:text-gray-900 select-none transition-colors'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer group py-2'>
            <div className='relative'>
                <input 
                    type="radio" 
                    name='sortOption' 
                    checked={selected} 
                    onChange={() => onChange(label)}
                    className='peer sr-only'
                />
                <div className='w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 transition-all duration-300 flex items-center justify-center'>
                    <div className='w-2.5 h-2.5 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full scale-0 peer-checked:scale-100 transition-transform duration-300'></div>
                </div>
            </div>
            <span className='text-sm text-gray-700 group-hover:text-gray-900 select-none transition-colors'>{label}</span>
        </label>
    )
}

const AllRoom2 = () => {
    const navigate = useNavigate()
    const [openFilters, setOpenFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState([])
    const [selectedSort, setSelectedSort] = useState('')
    
    const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"]
    const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"]
    const sortOption = ["Price Low to High", "Price High to Low", "Newest first"]

    const handleFilterChange = (checked, label) => {
        if (checked) {
            setSelectedFilters([...selectedFilters, label])
        } else {
            setSelectedFilters(selectedFilters.filter(f => f !== label))
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
            <div className='flex flex-col-reverse lg:flex-row items-start justify-between gap-8 pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 pb-20'>
                
                {/* LEFT SIDE - Room Listings */}
                <div className='flex-1 w-full'>
                    {/* Header */}
                    <div className='mb-12'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='h-8 w-1 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full'></div>
                            <h1 className='font-playfair text-4xl md:text-5xl font-bold text-gray-900'>
                                Discover Hotels
                            </h1>
                        </div>
                        <p className='text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed'>
                            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                        </p>
                        
                        {/* Results Bar */}
                        <div className='flex items-center justify-between mt-8 p-5 bg-white rounded-2xl shadow-md border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Available Properties</p>
                                    <p className='text-2xl font-bold text-gray-900'>{roomsDummyData.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Room Cards */}
                    <div className='space-y-8'>
                        {roomsDummyData.map((room, index) => (
                            <div 
                                key={room._id} 
                                className='group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2'
                            >
                                <div className='absolute inset-0 bg-gradient-to-br from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-3xl'></div>
                                
                                <div className='relative flex flex-col md:flex-row p-6 gap-6'>
                                    {/* Image Section */}
                                    <div className='md:w-2/5 relative'>
                                        <div className='relative overflow-hidden rounded-2xl aspect-[4/3] group/image'>
                                            <img 
                                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                                src={room.images[0]} 
                                                alt={room.hotel.name}
                                                className='w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover/image:scale-110' 
                                            />
                                            
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500'></div>
                                            
                                            {/* Wishlist Button */}
                                            <button className='absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300'>
                                                <svg className='w-5 h-5 text-gray-700 hover:text-red-500 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                                                </svg>
                                            </button>
                                            
                                            {/* Featured Badge */}
                                            {index % 3 === 0 && (
                                                <div className='absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg'>
                                                    ⭐ Featured
                                                </div>
                                            )}
                                            
                                            {/* View Details Overlay */}
                                            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500'>
                                                <button 
                                                    onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                                    className='px-6 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-xl hover:scale-105 transition-transform'
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className='md:w-3/5 flex flex-col justify-between'>
                                        <div>
                                            {/* Location */}
                                            <div className='flex items-center gap-2 text-gray-500 text-sm mb-3'>
                                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                                                </svg>
                                                <span className='font-medium'>{room.hotel.city}</span>
                                            </div>
                                            
                                            {/* Hotel Name */}
                                            <h2 
                                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }} 
                                                className='text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3 cursor-pointer hover:text-orange-600 transition-colors leading-tight'
                                            >
                                                {room.hotel.name}
                                            </h2>
                                            
                                            {/* Rating & Reviews */}
                                            <div className='flex items-center gap-3 mb-4'>
                                                <div className='flex items-center gap-1 px-3 py-1.5 bg-orange-50 rounded-lg'>
                                                    <StarRating />
                                                </div>
                                                <span className='text-sm text-gray-600'>
                                                    <span className='font-semibold text-gray-900'>4.8</span> (200+ reviews)
                                                </span>
                                            </div>
                                            
                                            {/* Address */}
                                            <div className='flex items-start gap-2 text-gray-600 mb-6'>
                                                <svg className='w-5 h-5 mt-0.5 text-orange-500' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                                                </svg>
                                                <span className='text-sm leading-relaxed'>{room.hotel.address}</span>
                                            </div>
                                            
                                            {/* Amenities */}
                                            <div className='flex flex-wrap gap-2 mb-6'>
                                                {room.amenities.slice(0, 5).map((item, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className='flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-300 group/amenity'
                                                    >
                                                        <img 
                                                            src={facilityIcons[item]} 
                                                            alt={item} 
                                                            className='w-4 h-4 group-hover/amenity:scale-110 transition-transform' 
                                                        />
                                                        <span className='text-xs font-medium text-gray-700'>{item}</span>
                                                    </div>
                                                ))}
                                                {room.amenities.length > 5 && (
                                                    <div className='flex items-center px-3 py-2 bg-gray-100 rounded-xl border border-gray-200'>
                                                        <span className='text-xs font-medium text-gray-600'>+{room.amenities.length - 5} more</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Bottom - Price & CTA */}
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-200'>
                                            <div>
                                                <p className='text-sm text-gray-500 mb-1'>Starting from</p>
                                                <div className='flex items-baseline gap-2'>
                                                    <p className='text-3xl md:text-4xl font-bold text-gray-900'>
                                                        ${room.pricePerNight}
                                                    </p>
                                                    <span className='text-lg text-gray-500 font-medium'>/night</span>
                                                </div>
                                                <p className='text-xs text-green-600 font-medium mt-1'>✓ Free cancellation</p>
                                            </div>
                                            
                                            <button 
                                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                                className='group/btn px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden whitespace-nowrap'
                                            >
                                                <span className='relative z-10 flex items-center gap-2'>
                                                    View Details
                                                    <svg className='w-5 h-5 group-hover/btn:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                                    </svg>
                                                </span>
                                                <div className='absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className='flex justify-center mt-12'>
                        <button className='group px-10 py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3'>
                            <span>Load More Properties</span>
                            <svg className='w-5 h-5 group-hover:rotate-180 transition-transform duration-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - Premium Filters */}
                <div className='lg:w-80 xl:w-96 w-full lg:sticky lg:top-24'>
                    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                        {/* Header */}
                        <div className='bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-5'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                                    </svg>
                                    Filters
                                </h2>
                                <button 
                                    onClick={() => {
                                        setSelectedFilters([])
                                        setSelectedSort('')
                                        setOpenFilters(!openFilters)
                                    }}
                                    className='text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors lg:block'
                                >
                                    <span className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
                                    <span className='hidden lg:block'>Clear All</span>
                                </button>
                            </div>
                        </div>

                        {/* Filter Content */}
                        <div className={`${openFilters ? 'max-h-[2000px]' : 'max-h-0 lg:max-h-[2000px]'} overflow-hidden transition-all duration-700`}>
                            <div className='p-6 space-y-8'>
                                {/* Room Types */}
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                        <span className='w-1 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full'></span>
                                        Room Type
                                    </h3>
                                    <div className='space-y-1'>
                                        {roomTypes.map((room, index) => (
                                            <CheckBox 
                                                key={index} 
                                                label={room}
                                                selected={selectedFilters.includes(room)}
                                                onChange={handleFilterChange}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>

                                {/* Price Range */}
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                        <span className='w-1 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full'></span>
                                        Price Range
                                    </h3>
                                    <div className='space-y-1'>
                                        {priceRanges.map((range, index) => (
                                            <CheckBox 
                                                key={index} 
                                                label={`$ ${range}`}
                                                selected={selectedFilters.includes(`$ ${range}`)}
                                                onChange={handleFilterChange}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>

                                {/* Sort By */}
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                        <span className='w-1 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full'></span>
                                        Sort By
                                    </h3>
                                    <div className='space-y-1'>
                                        {sortOption.map((option, index) => (
                                            <RadioButton 
                                                key={index} 
                                                label={option}
                                                selected={selectedSort === option}
                                                onChange={setSelectedSort}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className='px-6 pb-6'>
                                <button className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group'>
                                    <span className='relative z-10 flex items-center justify-center gap-2'>
                                        Apply Filters
                                        <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                        </svg>
                                    </span>
                                    <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Badge */}
                    {selectedFilters.length > 0 && (
                        <div className='mt-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200'>
                            <div className='flex items-center justify-between mb-3'>
                                <p className='text-sm font-semibold text-gray-900'>Active Filters ({selectedFilters.length})</p>
                                <button 
                                    onClick={() => setSelectedFilters([])}
                                    className='text-xs text-orange-600 hover:text-orange-700 font-medium'
                                >
                                    Clear
                                </button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {selectedFilters.map((filter, idx) => (
                                    <span key={idx} className='px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-orange-200'>
                                        {filter}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllRoom2