import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import Login from "../Auth/Login/Login";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-gray-200 p-4 overflow-hidden dark:bg-gray-900`}
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-[-1]">
        <img
          // src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/06f21a161921919.63cd7887d0a70.gif"
          alt="Background"
          className="w-full h-full object-cover filter blur-lg"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Image Section */}
        <motion.div
          className="lg:w-1/2 w-full flex justify-center mb-6 lg:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/06f21a161921919.63cd7887d0a70.gif" // Replace with your image URL
            alt="Vlog"
            className="w-full h-auto object-cover "
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="lg:w-1/2 w-full flex flex-col items-center lg:items-start mt-8 lg:mt-0 mx-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl dark:text-white lg:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left">
            Welcome to the Vlog
          </h1>
          <p className="mt-4 dark:text-white text-lg text-gray-700 text-center lg:text-left">
            Dive into our latest adventures and stories. Join us as we explore
            new places, share unique experiences, and capture moments that
            matter.
          </p>
          <motion.button
            onClick={() => setIsPostOpen((prev) => !isAuthenticated && !prev)}
            href="#get-started" // Update with the actual link or section ID
            className="mt-8 inline-block px-6 py-3 text-white bg-blue-500 rounded-xl shadow-lg transition duration-300"
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            {!isAuthenticated ? (
              "Create Account"
            ) : (
              <Link to="/createVlog">Get Started</Link>
            )}
          </motion.button>
        </motion.div>
      </div>
      {!isAuthenticated && (
        <Modal isOpen={isPostOpen} onClose={() => setIsPostOpen(false)}>
          <Login />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
