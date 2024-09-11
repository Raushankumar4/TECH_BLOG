import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url, user } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Store/Slices/authslice";
import { toast } from "react-hot-toast";
import { setUser, setUserProfile } from "../Redux/Store/Slices/userSlice";
import ThemeToggle from "../../Utils/ThemeToggle";
import {
  setAllVlogs,
  setComment,
  setMyVlogs,
} from "../Redux/Store/Slices/vlogSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${url}${user}/logout`);

      dispatch(logout());
      dispatch(setUser(null));
      dispatch(setUserProfile(null));
      dispatch(setAllVlogs(null));
      dispatch(setMyVlogs(null));
      dispatch(setComment(null));
      toast.success(data?.message);
      naviagate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <nav
      className={`dark:bg-gray-900 bg-gray-200  dark:text-white text-gray-800 shadow-md`}
    >
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
          {isAuthenticated && (
            <>
              <h1 className="hover:text-gray-600 pt-1">
                <ThemeToggle />
              </h1>
              <Link to="/profile" className="hover:text-gray-600">
                Profile
              </Link>
              <Link to="/bloglist" className="hover:text-gray-600">
                Blog
              </Link>
              <Link to="/blog" className="hover:text-gray-600">
                My Blog
              </Link>
              <Link to="/blogjj" className="hover:text-gray-600">
                Favorite
              </Link>
            </>
          )}
          <Link className="hover:text-gray-600">Contact</Link>
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
