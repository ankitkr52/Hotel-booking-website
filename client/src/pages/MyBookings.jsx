import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const { axios, getToken, user, currency, navigate } = useAppContext()  

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [payingId, setPayingId] = useState(null)  

    // ✅ Razorpay Script Dynamic Load
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true)
                return
            }
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const fetchUserBookings = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/bookings/user', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handlePayment = async (booking) => {
        try {
            setPayingId(booking._id)  // ✅ Loading state for button

            // ✅ Step 1: Script load karo
            const scriptLoaded = await loadRazorpayScript()
            if (!scriptLoaded) {
                return toast.error("Failed to load payment gateway!")
            }

            // ✅ Step 2: Order banao
            const { data } = await axios.post(
                '/api/bookings/razorpay-payment',
                { bookingId: booking._id },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )

            if (!data.success) {
                return toast.error(data.message)
            }

            // ✅ Step 3: Razorpay checkout open karo
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: "LuxeBook",
                description: `Booking for ${booking.room?.roomType}`,
                order_id: data.order.id,
                image: "/icon.png",

                // ✅ Step 4: Payment verify karo
                handler: async (response) => {
                    try {
                        const { data: verifyData } = await axios.post(
                            '/api/bookings/verify-payment',
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingId: booking._id
                            },
                            { headers: { Authorization: `Bearer ${await getToken()}` } }
                        )

                        if (verifyData.success) {
                            toast.success("Payment Successful! 🎉")
                            navigate('/loader/my-bookings')  // ✅ Loader se redirect
                        } else {
                            toast.error("Payment verification failed!")
                        }
                    } catch (error) {
                        toast.error(error.message)
                    }
                },

                prefill: {
                    name: user?.fullName || "",
                    email: user?.primaryEmailAddress?.emailAddress || "",
                },

                theme: { color: "#f97316" },

                modal: {
                    ondismiss: () => {
                        toast.error("Payment cancelled!")
                        setPayingId(null)  // ✅ Reset loading
                    }
                }
            }

            const razorpayInstance = new window.Razorpay(options)
            razorpayInstance.open()

        } catch (error) {
            toast.error(error.message)
        } finally {
            setPayingId(null) 
        }
    }

    useEffect(() => {
        if (user) fetchUserBookings()
    }, [user])

    // ✅ Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500" />
            </div>
        )
    }

    return (
        <div className="py-28 md:pt-32 md:pb-40 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Title
                    title="My Bookings"
                    subTitle="Easily manage your past, current, and upcoming hotel reservations in one place."
                    align="left"
                />

                {/* ✅ Empty State */}
                {bookings.length === 0 ? (
                    <div className="mt-12 text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-xl text-gray-600 font-medium">No bookings found</p>
                        <p className="text-gray-400 text-sm mt-2">You haven't made any bookings yet.</p>
                        <button
                            onClick={() => navigate('/rooms')}
                            className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
                        >
                            Explore Hotels
                        </button>
                    </div>
                ) : (
                    <div className="mt-12 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">

                        {/* Table Header Desktop */}
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
                                            loading="lazy"  // ✅ lazy loading
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
                                            Total: <span className="text-orange-600">{currency}{booking.totalPrice}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Date & Duration */}
                                <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-8 md:gap-12">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Check-In</p>
                                        <p className="font-medium text-gray-800">
                                            {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                                                weekday: 'short', month: 'short', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Check-Out</p>
                                        <p className="font-medium text-gray-800">
                                            {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                                                weekday: 'short', month: 'short', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end justify-center">
                                    <div className={`flex items-center gap-2 px-5 py-2 rounded-2xl ${
                                        booking.isPaid
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        <div className={`w-3 h-3 rounded-full ${booking.isPaid ? "bg-green-600" : "bg-red-600"}`} />
                                        <span className="font-medium text-sm">
                                            {booking.isPaid ? "Paid" : "Payment Pending"}
                                        </span>
                                    </div>

                                    {/* ✅ Pay Now Button with Loading */}
                                    {!booking.isPaid && (
                                        <button
                                            onClick={() => handlePayment(booking)}
                                            disabled={payingId === booking._id}
                                            className="mt-5 px-8 py-3 bg-orange-600 hover:bg-orange-700 
                                                       disabled:opacity-70 disabled:cursor-not-allowed
                                                       text-white text-sm font-medium rounded-2xl 
                                                       transition-all active:scale-95 shadow-sm
                                                       flex items-center gap-2"
                                        >
                                            {payingId === booking._id ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                                    Processing...
                                                </>
                                            ) : (
                                                'Pay Now'
                                            )}
                                        </button>
                                    )}

                                    {/* ✅ Transaction ID */}
                                    {booking.isPaid && (
                                        <p className="text-xs text-gray-500 mt-4">
                                            Transaction ID: #BK{booking._id.slice(-6)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookings;