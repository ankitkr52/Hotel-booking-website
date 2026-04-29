import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomtype: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const handleAmenityChange = (amenity) => {
    setInputs((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const handleImageChange = (key, file) => {
    setImages((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      images,
      inputs,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
    >
      <Title
        align="left"
        font="outfit"
        title="Add New Room"
        subTitle="Fill accurate room details, upload premium images, and configure amenities for better booking conversions."
      />

      {/* IMAGE UPLOAD */}
      <div className="mt-10">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Upload Room Images
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(images).map((key) => (
            <label
              key={key}
              htmlFor={`roomImage${key}`}
              className="group relative border-2 border-dashed border-gray-300 rounded-xl overflow-hidden h-32 cursor-pointer hover:border-primary transition-all bg-gray-50"
            >
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {!images[key] && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 font-medium bg-white/60">
                  Upload
                </div>
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                onChange={(e) =>
                  handleImageChange(key, e.target.files[0])
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* ROOM INFO */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {/* ROOM TYPE */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Room Type
          </label>

          <select
            value={inputs.roomtype}
            onChange={(e) =>
              setInputs({
                ...inputs,
                roomtype: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Price / Night
          </label>

          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">₹</span>

            <input
              type="number"
              placeholder="0"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  pricePerNight: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* AMENITIES */}
      <div className="mt-10">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Room Amenities
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <label
              key={index}
              className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition"
            >
              <input
                type="checkbox"
                checked={inputs.amenities[amenity]}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4 h-4 accent-primary"
              />

              <span className="text-gray-700 text-sm font-medium">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          className="bg-primary hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium shadow-md transition-all"
        >
          Add Room
        </button>
      </div>
    </form>
  );
};

export default AddRoom;