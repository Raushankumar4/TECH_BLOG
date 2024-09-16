import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { url, user } from "../../../constant";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../Notify/Notify";

const UpdateProfile = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const userProfile = useSelector((state) => state.user.userProfile);
  const [updateProfile, setUpdateProfile] = useState({
    fullName: userProfile?.fullName || "",
    username: userProfile?.username || "",
    profileImage: userProfile?.profileImage || null,
  });
  const [imagePreview, setImagePreview] = useState(userProfile?.profileImage);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.user);
  const id = userId?._id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setUpdateProfile((prevInput) => ({
          ...prevInput,
          [name]: file,
        }));
        setImagePreview(fileURL);
      } else {
        setUpdateProfile((prevInput) => ({
          ...prevInput,
          [name]: null,
        }));
        setImagePreview(null);
      }
    } else {
      setUpdateProfile((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setUpdateProfile((prevInput) => ({
      ...prevInput,
      profileImage: null,
    }));
    setImagePreview(null);
  };

  const handleOnUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!id || !token) return <p>Something went wrong</p>;
      const formData = new FormData();
      formData.append("fullName", updateProfile.fullName);
      formData.append("username", updateProfile.username);
      formData.append("profileImage", updateProfile.profileImage);
      console.log(formData);
      const { data } = await axios.put(
        `${url}${user}/updateuserprofile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      successToast(data?.message);
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      errorToast(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="min-h-screen md:pt-[6vw] pt-[22vw] dark:bg-gray-900 w-full flex items-center justify-center bg-gray-200 p-4 dark:text-white">
      <motion.div
        className="flex flex-col md:flex-row bg-gray-200 shadow-lg rounded-lg overflow-hidden max-w-screen-md w-full h-full md:h-auto"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Left Side: Profile Image */}
        <div className="w-full md:w-1/2 bg-gray-200">
          <div className="w-full h-64 md:h-full dark:bg-gray-200 p-4 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <p className="text-lg">No Image Selected</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Update Form */}
        <div className="w-full md:w-1/2 dark:bg-gray-800 p-4 md:p-6 flex flex-col">
          <h2 className="text-2xl dark:text-white md:text-3xl font-bold text-gray-900">
            Update Profile
          </h2>
          <form onSubmit={handleOnUpdateProfile} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="fullName"
              >
                Name
              </label>
              <input
                type="text"
                name="fullName"
                value={updateProfile.fullName}
                onChange={handleOnChange}
                className="w-full p-2 bg-gray-50 border rounded-md dark:bg-gray-900 dark:text-white"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={updateProfile.username}
                onChange={handleOnChange}
                className="w-full p-2 bg-gray-50 border rounded-md dark:bg-gray-900 dark:text-white"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                disabled
                value={userProfile?.email}
                className="w-full p-2 bg-gray-50 border rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                disabled
                className="w-full bg-gray-50 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="*********"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="profileImage"
              >
                Profile Image
              </label>

              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleOnChange}
                className="w-full opacity-0 border bg-gray-200 rounded-md dark:bg-gray-900 dark:text-white"
              />

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 text-red-500"
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex space-x-4 ">
              <motion.button
                disabled={isLoading}
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-400 w-full dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 md:w-auto"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? "Updating" : "Update"}
              </motion.button>
              {!isLoading && (
                <motion.button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="bg-gray-600 dark:bg-gray-900 dark:text-gray-300 text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-500 w-full md:w-auto"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Back
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
