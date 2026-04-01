import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRoom from './pages/AllRoom'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")

  return (
    <div>
      {!isOwnerPath && < Navbar />}
      <HotelReg />
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/rooms/:id' element={<RoomDetails/>} />
          <Route path="/rooms" element={<AllRoom/>} />
          <Route path="/my-bookings" element={<MyBookings/>} />
          
        </Routes>
      </div>
     <Footer/>
    </div>
  )
}

export default App
