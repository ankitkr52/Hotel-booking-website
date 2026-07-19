import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Loader from './components/Loader'


// ✅ Lazy load — Heavy pages
const Home = lazy(() => import('./pages/Home'))
const AllRoom = lazy(() => import('./pages/AllRoom'))
const RoomDetails = lazy(() => import('./pages/RoomDetails'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const HotelReg = lazy(() => import('./components/HotelReg'))
const Layout = lazy(() => import('./pages/hotelOwner/layout'))
const Dashboard = lazy(() => import('./pages/hotelOwner/Dashboard'))
const AddRoom = lazy(() => import('./pages/hotelOwner/AddRoom'))
const ListRoom = lazy(() => import('./pages/hotelOwner/ListRoom'))

// ✅ Footer bhi lazy load
const Footer = lazy(() => import('./components/Footer'))

// ✅ Loading Spinner Component
const PageLoader = () => (
    <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500" />
            <p className="text-gray-500 text-sm font-medium">Loading...</p>
        </div>
    </div>
)

const App = () => {
    const isOwnerPath = useLocation().pathname.startsWith("/owner")
    const { ShowHotelReg } = useAppContext()

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster />

            {/* Navbar — NOT lazy (always visible) */}
            {!isOwnerPath && <Navbar />}

            {/* ✅ HotelReg — lazy load */}
            {ShowHotelReg && (
                <Suspense fallback={null}>
                    <HotelReg />
                </Suspense>
            )}

            {/* ✅ Main Routes — Suspense wrap */}
            <div className='min-h-[70vh]'>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/rooms/:id' element={<RoomDetails />} />
                        <Route path="/rooms" element={<AllRoom />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/loader/:nextUrl" element={<Loader/>} />


                        <Route path='/owner' element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path='add-room' element={<AddRoom />} />
                            <Route path='list-room' element={<ListRoom />} />
                        </Route>
                    </Routes>
                </Suspense>
            </div>

            {/* ✅ Footer — lazy load */}
            {!isOwnerPath && (
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            )}
        </div>
    )
}

export default App