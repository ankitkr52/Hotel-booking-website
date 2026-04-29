import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData] = useState(dashboardDummyData);

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
      value: `₹${dashboardData.totalRevenue}`,
      icon: assets.totalRevenueIcon,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="pb-10">
      {/* TITLE */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor room listings, track bookings, and analyze revenue with real-time business insights."
      />

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl border ${item.border} ${item.bg} p-5 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <img src={item.icon} alt="" className="h-7" />
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {item.title}
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${item.color}`}>
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Bookings
          </h2>

          <span className="text-sm text-gray-500">
            {dashboardData.bookings.length} Records
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Guest Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Room Type
                </th>

                <th className="text-center px-6 py-4 font-semibold text-gray-600">
                  Amount
                </th>

                <th className="text-center px-6 py-4 font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.user.username}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.room.roomType}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold text-gray-800">
                    ₹{item.totalPrice}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        item.isPaid
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPACT FOOTER GAP FIX */}
      <div className="mt-8"></div>
    </div>
  );
};

export default Dashboard;