import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, userBookingsDummyData } from '../assets/assets';

const MyBookings = () => {
    const [bookings] = useState(userBookingsDummyData);

    return (
        <div className="py-28 md:pt-32 md:pb-40 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Title 
                    title="My Bookings" 
                    subTitle="Easily manage your past, current, and upcoming hotel reservations in one place." 
                    align="left" 
                />

                {/* Bookings List */}
                <div className="mt-12 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                    
                    {/* Table Header (Desktop) */}
                    <div className="hidden md:grid md:grid-cols-[3fr_2fr_1.2fr] bg-gray-50 border-b border-gray-200 px-8 py-5 font-medium text-gray-600 text-sm uppercase tracking-wider">
                        <div>Hotel & Room</div>
                        <div>Date & Duration</div>
                        <div className="text-right">Payment Status</div>
                    </div>

                    {/* Bookings */}
                    {bookings.map((booking) => (
                        <div 
                            key={booking._id} 
                            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1.2fr] border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 px-6 md:px-8 py-8 md:py-7"
                        >
                            {/* Hotel & Room Details */}
                            <div className="flex flex-col md:flex-row gap-5 md:gap-6">
                                <div className="flex-shrink-0">
                                    <img 
                                        src={booking.room.images[0]} 
                                        alt={booking.hotel.name}
                                        className="w-full md:w-40 h-40 md:h-28 object-cover rounded-2xl shadow-sm" 
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <p className="font-playfair text-2xl md:text-3xl text-gray-900">
                                            {booking.hotel.name}
                                        </p>
                                        <p className="text-gray-600 text-base mt-1">
                                            {booking.room.roomType}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                                        <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                                        <span>{booking.hotel.address}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                                        <span>{booking.guests} Guests</span>
                                    </div>

                                    <p className="text-lg font-semibold text-gray-900 mt-3">
                                        Total: <span className="text-orange-600">${booking.totalPrice}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Date & Timings */}
                            <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-8 md:gap-12">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Check-In</p>
                                    <p className="font-medium text-gray-800">
                                        {new Date(booking.checkInDate).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Check-Out</p>
                                    <p className="font-medium text-gray-800">
                                        {new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end justify-center">
                                <div className={`flex items-center gap-2 px-5 py-2 rounded-2xl 
                                    ${booking.isPaid 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-red-100 text-red-700'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full ${booking.isPaid ? "bg-green-600" : "bg-red-600"}`} />
                                    <span className="font-medium text-sm">
                                        {booking.isPaid ? "Paid" : "Payment Pending"}
                                    </span>
                                </div>

                                {!booking.isPaid && (
                                    <button 
                                        className="mt-5 px-8 py-3 bg-orange-600 hover:bg-orange-700 
                                                   text-white text-sm font-medium rounded-2xl 
                                                   transition-all active:scale-95 shadow-sm"
                                    >
                                        Pay Now
                                    </button>
                                )}

                                {booking.isPaid && (
                                    <p className="text-xs text-gray-500 mt-4">Transaction ID: #BK{booking._id.slice(-6)}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {bookings.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-400">No bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;