import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle='view,edit,or manage all listed rooms. Keeps the information up-to-date to provide the best experiance for users.' />
      <p className='text-gray-500 mt-8'>All Rooms</p>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-4'>
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                Name
              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                Facility
              </th>

              <th className=" px-6 py-4 font-semibold text-gray-600">
                Price / night
              </th>

              <th className="text-center px-6 py-4 font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {
              rooms.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-400 font-medium">
                    {item.roomType}
                  </td>
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-400 font-medium max-sm-hidden">
                    {item.amenities.join(' , ')}
                  </td>
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-400 font-medium">
                    {item.pricePerNight}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-400 font-medium text-sm text-red-500 text-center">
                    <label htmlFor="" className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input type="checkbox" className='sr-only peer' checked={item.isAvailable} />
                      <div className='w-12 h-7 bg-slate-400 rounded-full peer peer-checked:bg-blue-700 transition-colors duration-300'>

                      </div>
                      <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'>

                      </span>
                    </label>
                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>
      </div>
    </div>
    
  )
}

export default ListRoom
