import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken, hotelData, hotelLoading, navigate } = useAppContext()

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
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

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)) {
      toast.error("Please Fill in all the details ")
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('roomType', inputs.roomType)
      formData.append('pricePerNight', inputs.pricePerNight)

      const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
      formData.append('amenities', JSON.stringify(amenities))

      // adding imagees in formData 
      Object.keys(images).forEach((key) => {
        images[key] && formData.append('images', images[key])
      })

      const { data } = await axios.post('/api/rooms', formData, { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        toast.success(data.message)
        setInputs({
          roomType: '',
          pricePerNight: '',
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        })
        setImages({ 1: null, 2: null, 3: null, 4: null })
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  };

  // Show loading state while fetching hotel
  if (hotelLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <p className="text-gray-600">Loading hotel information...</p>
      </div>
    )
  }

  // If no hotel, prompt user to register
  if (!hotelData) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-red-200 p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-red-900 mb-2">Hotel Registration Required</h2>
            <p className="text-red-700 mb-4">
              You must register your hotel first before adding rooms. Please complete your hotel registration to proceed.
            </p>
            <button
              onClick={() => navigate('/owner/dashboard')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-gray-600">Adding rooms to: <span className="font-semibold text-gray-900">{hotelData.name}</span></p>
      </div>

      <form
        onSubmit={onSubmitHandler}
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
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  roomType: e.target.value,
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
              <span className="absolute left-4 top-3 text-gray-500">$</span>

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
            disabled={loading}
            className="bg-primary hover:opacity-90 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium shadow-md transition-all"
          >
            {loading ? 'Adding Room...' : 'Add Room'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddRoom;