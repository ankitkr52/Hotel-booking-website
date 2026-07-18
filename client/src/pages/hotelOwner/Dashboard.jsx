import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { currency, user, getToken, axios } = useAppContext()
  
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalRevenue: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/bookings/hotel', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const stats = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: assets.totalBookingIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue}`,
      icon: assets.totalRevenueIcon,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
      </div>
    )
  }

  return (
    <div className="pb-10 px-2 sm:px-0">
      {/* TITLE */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor room listings, track bookings, and analyze revenue with real-time business insights."
      />

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl border ${item.border} ${item.bg} p-4 sm:p-5 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <img src={item.icon} alt="" className="h-6 sm:h-7" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">
                  {item.title}
                </p>
                <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${item.color}`}>
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-8 sm:mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Recent Bookings
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-500">
              {dashboardData.bookings.length} Records
            </span>
            {/* ✅ Refresh Button */}
            <button
              onClick={fetchDashboardData}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* ✅ Empty State */}
        {dashboardData.bookings.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-lg">No Bookings Yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Bookings will appear here once guests start booking your rooms.
            </p>
          </div>
        ) : (
          <>
            {/* ✅ Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Guest Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Room Type</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-600">Amount</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.bookings.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {item.user?.username || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.room?.roomType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-800">
                        {currency}{item.totalPrice}  {/* ✅ currency variable */}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isPaid
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {item.isPaid ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {dashboardData.bookings.map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-800 text-sm">
                      {item.user?.username || 'N/A'}
                    </p>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.isPaid
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {item.room?.roomType || 'N/A'}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {currency}{item.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;