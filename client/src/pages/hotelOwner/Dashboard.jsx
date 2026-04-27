import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData)
  return (
    <div>
      <Title align="left" font="outfit" title="Dashboard" subTitle="Moniter your room listing, track bookings and analyis revenue-all in one place. stay updated with real-time insights to ensure smooth operation." />

      <div className='flex gap-8 my-8'>
        {/* Total booking */}
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
          </div>

        </div>
        {/* Total Revenue */}
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>${dashboardData.totalRevenue}</p>
          </div>

        </div>
      </div>
      {/* Recent booking */}
      <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>User name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room name</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Payment Status</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {dashboardData.bookings.map((item, index) => (

            
              <tr key={index} >
                <td className='py-3 px-4 text-gray-700 border-t border-gray-400'>
                  {item.user.username}
                </td>

                <td className='py-3 px-4 text-gray-700 border-t border-gray-400 max-sm:hidden'>
                  {item.room.roomType}
                </td>

                <td className='py-3 px-4 text-gray-700 border-t border-gray-400 text-center'>
                  ${item.totalPrice}
                </td>

                <td className='py-3 px-4 flex border-t border-gray-400'>
                  <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-300 text-green-700' : 'bg-amber-300 text-yellow-600'}`}>
                    {item.isPaid ? 'Completed':'Pending'}
                    </button>

                </td>
              </tr>

            ))}

          </tbody>

        </table>
       

      </div>
    </div>
  )
}

export default Dashboard
