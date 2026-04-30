import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  const toggleAvailability = (index) => {
    const updated = [...rooms];
    updated[index].isAvailable = !updated[index].isAvailable;
    setRooms(updated);
  };

  return (
    <div className="pb-10">
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, and manage all listed rooms. Keep everything updated for the best booking experience."
      />

      {/* HEADER */}
      <div className="flex justify-between items-center mt-8">
        <p className="text-lg font-semibold text-gray-800">
          All Rooms
        </p>
        <span className="text-sm text-gray-500">
          {rooms.length} Rooms
        </span>
      </div>

      {/* TABLE CONTAINER */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Room
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Amenities
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-center font-semibold text-gray-600">
                  Availability
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* ROOM */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <p className="font-medium text-gray-800">
                      {item.roomType}
                    </p>
                  </td>

                  {/* AMENITIES */}
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="flex flex-wrap gap-2">
                      {item.amenities.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                      {item.amenities.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{item.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{item.pricePerNight}
                    <span className="text-xs text-gray-400">
                      {" "}
                      / night
                    </span>
                  </td>

                  {/* TOGGLE */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleAvailability(index)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        item.isAvailable
                          ? "bg-emerald-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          item.isAvailable
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>

                    <p
                      className={`text-xs mt-1 ${
                        item.isAvailable
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Hidden"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {rooms.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No rooms available
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRoom;