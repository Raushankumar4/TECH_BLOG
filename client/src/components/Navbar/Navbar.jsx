import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { url, user } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Store/Slices/authslice";
import { setUser, setUserProfile } from "../Redux/Store/Slices/userSlice";
import ThemeToggle from "../../Utils/ThemeToggle";
import {
  setAllVlogs,
  setComment,
  setMyVlogs,
} from "../Redux/Store/Slices/vlogSlice";
import { useGetSavedPost } from "../../hooks/useGetSavedPost";
import Modal from "../Modal/Modal";
import Login from "../Auth/Login/Login";
import { errorToast, successToast } from "../Notify/Notify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedPost = useSelector((state) => state.vlog.savedVlogs?.length);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const id = useSelector((state) => state.user.user?._id);

  useGetSavedPost(id);

  useEffect(() => {
    if (isPostOpen) {
      setIsOpen(false); // Close navbar when modal is open
    }
  }, [isPostOpen]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${url}${user}/logout`);
      dispatch(logout());
      dispatch(setUser(null));
      dispatch(setUserProfile(null));
      dispatch(setAllVlogs(null));
      dispatch(setMyVlogs(null));
      dispatch(setComment(null));
      successToast(data?.message);
      navigate("/");
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 dark:bg-gray-900 bg-gray-200 dark:text-white text-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold">
          TECH
        </NavLink>
        <button
          className="lg:hidden text-gray-800 dark:text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
        <div className="hidden lg:flex space-x-6 font-medium text-md">
          <ThemeToggle />
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 dark:text-blue-300"
                : "hover:text-gray-600 dark:hover:text-gray-300"
            }
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300"
                    : "hover:text-gray-600 dark:hover:text-gray-300"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/bloglist"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300"
                    : "hover:text-gray-600 dark:hover:text-gray-300"
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/myblog"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300"
                    : "hover:text-gray-600 dark:hover:text-gray-300"
                }
              >
                My Blog
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 relative"
                    : "hover:text-gray-600 dark:hover:text-gray-300 relative"
                }
              >
                Favorite
                {savedPost > 0 && (
                  <span className="absolute top-[-10px] right-4 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {savedPost}
                  </span>
                )}
              </NavLink>
            </>
          )}
          <NavLink
            to="/contactUs"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 dark:text-blue-300"
                : "hover:text-gray-600 dark:hover:text-gray-300"
            }
          >
            Contact
          </NavLink>
          {!isAuthenticated ? (
            <button onClick={() => setIsPostOpen((prev) => !prev)}>
              <NavLink className="hover:text-gray-600 dark:hover:text-gray-300">
                Sign In
              </NavLink>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              LogOut
            </button>
          )}
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
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <HiX />
          </button>
          {isAuthenticated ? (
            <>
              <ThemeToggle />
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Profile
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/bloglist"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Blog
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/myblog"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                My Blog
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg relative"
                    : "text-white text-lg hover:text-gray-400 relative"
                }
              >
                Favorite
                {savedPost > 0 && (
                  <span className="absolute top-[-10px] right-4 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {savedPost}
                  </span>
                )}
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/contactUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Contact
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white text-lg hover:text-gray-400"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <NavLink
                onClick={() => setIsOpen(false) && setIsPostOpen(false)}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/contactUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 dark:text-blue-300 text-lg"
                    : "text-white text-lg hover:text-gray-400"
                }
              >
                Contact
              </NavLink>
              <button onClick={() => setIsPostOpen((prev) => !prev)}>
                <NavLink
                  className="text-white text-lg hover:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </NavLink>
              </button>
            </>
          )}
        </motion.div>
      </div>
      {!isAuthenticated && (
        <Modal isOpen={isPostOpen} onClose={() => setIsPostOpen(false)}>
          <Login />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
