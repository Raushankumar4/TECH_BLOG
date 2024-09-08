import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { url, user } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getAuthRefresh, logout } from "../Redux/Store/Slices/authslice";
import { toast } from "react-hot-toast";
import { setUser } from "../Redux/Store/Slices/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${url}${user}/logout`);
      dispatch(getAuthRefresh());
      dispatch(logout());
      dispatch(setUser(null));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="bg-gray-200  text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          BLOG
        </Link>
        <button
          className="lg:hidden text-gray-800 text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
        <div className="hidden lg:flex space-x-6 font-medium text-md">
          <Link className="hover:text-gray-600">Contact</Link>
          {isAuthenticated && (
            <>
              <Link to="/profile" className="hover:text-gray-600">
                Profile
              </Link>
              <Link className="hover:text-gray-600">Blog</Link>
            </>
          )}
          <button onClick={handleLogout} className="hover:text-gray-600">
            {isAuthenticated && "logOut"}
          </button>
        </div>
        <motion.div
          className={`lg:hidden z-50 fixed inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center space-y-6 ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : "-100%" }}
          exit={{ opacity: 0, y: "-100%" }}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <HiX />
          </button>

          <Link className="text-white text-xl" onClick={toggleMenu}>
            About
          </Link>
          <Link className="text-white text-xl" onClick={toggleMenu}>
            Contact
          </Link>
          <Link className="text-white text-xl" onClick={toggleMenu}>
            <button onClick={handleLogout} className="text-white text-xl">
              {isAuthenticated && "LogOut"}
            </button>
          </Link>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
