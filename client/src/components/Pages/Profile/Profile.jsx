import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetProfile } from "../../../hooks/useGetProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userProfile } = useSelector((store) => store.user);
  const id = user?._id;
  useGetProfile(id);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const navigate = useNavigate();
  const handltoNavigate = () => {
    navigate("/upadateProfile");
  };
  return (
    <div className="min-h-screen dark:bg-gray-900 w-full flex items-center justify-center bg-gray-200 p-4 dark:text-white">
      <motion.div
        className="flex flex-col md:flex-row bg-gray-200 shadow-lg rounded-lg overflow-hidden max-w-screen-md w-full h-full md:h-auto"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Left Side: User Profile Image */}
        <div className="md:w-1/3 bg-gray-200 dark:bg-gray-100">
          <div className="w-full h-48 md:h-full p-4 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={
                userProfile?.profileImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Avatar"
            />
          </div>
        </div>

        {/* Right Side: User Details, Settings, and Update Profile */}
        <div className="md:w-2/3 dark:bg-gray-900 dark:shadow-gray-700 p-4 md:p-6 flex flex-col justify-center">
          <h2 className="text-2xl dark:text-white md:text-3xl font-bold text-gray-900">
            {userProfile?.fullName}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-1">
            {userProfile?.email}
          </p>
          <p className="text-lg md:text-xl text-gray-600 mt-2">
            @{userProfile?.username || " Software Developer and Blogger."}
          </p>
          <a
            href="https://johndoe.dev"
            className="text-blue-500 hover:underline mt-3 inline-block text-lg md:text-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://johndoe.dev
          </a>
          <div className="mt-4 md:mt-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
            <motion.button
              onClick={handltoNavigate}
              className="bg-gray-800 text-white py-3 px-6 rounded-lg text-lg md:text-xl hover:bg-gray-700 dark:bg-gray-800 w-full md:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Update Profile
            </motion.button>
            <motion.button
              onClick={() => navigate("/updatePassword")}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg text-lg md:text-xl hover:bg-gray-500 dark:bg-gray-800 w-full md:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Change Password
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
