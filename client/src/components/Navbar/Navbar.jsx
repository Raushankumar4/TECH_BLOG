import { useState, useEffect } from "react";
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
import { useGetSavedPost } from "../../hooks/useGetSavedPost";
import Modal from "../Modal/Modal";
import Login from "../Auth/Login/Login";

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
      toast.success(data?.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 dark:bg-gray-900 bg-gray-200 dark:text-white text-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          BLOG
        </Link>
        <button
          className="lg:hidden text-gray-800 dark:text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
        <div className="hidden lg:flex space-x-6 font-medium text-md">
          {isAuthenticated && (
            <>
              <ThemeToggle />
              <Link
                to="/"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                Profile
              </Link>
              <Link
                to="/bloglist"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                Blog
              </Link>

              <Link
                to="/myblog"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                My Blog
              </Link>
              <Link
                to="/blog"
                className="relative hover:text-gray-600 dark:hover:text-gray-300"
              >
                Saved Post
                {savedPost > 0 && (
                  <span className="absolute top-[-10px] right-4  bg-gray-600 text-white rounded-full px-2 py-1 text-xs">
                    {savedPost}
                  </span>
                )}
              </Link>
            </>
          )}

          <Link
            to="/contactUs"
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            Contact
          </Link>
          {!isAuthenticated && (
            <button
              onClick={() => setIsPostOpen((prev) => !isAuthenticated && !prev)}
            >
              <Link
                to="/contactUs"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                Sign In
              </Link>
            </button>
          )}
          {isAuthenticated && (
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

          {isAuthenticated && (
            <>
              <ThemeToggle />
              <Link
                onClick={() => setIsOpen(false)}
                to="/profile"
                className="text-white text-lg hover:text-gray-400"
              >
                Profile
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/bloglist"
                className="text-white text-lg hover:text-gray-400"
              >
                Blog
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/myblog"
                className="text-white text-lg hover:text-gray-400"
              >
                My Blog
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/blog"
                className="text-white text-lg hover:text-gray-400"
              >
                Saved
                {savedPost > 0 && (
                  <span className="absolute top-[-10px] right-4 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {savedPost}
                  </span>
                )}
              </Link>
            </>
          )}
          <Link
            onClick={() => setIsOpen(false)}
            to="/contactUs"
            className="text-white text-lg hover:text-gray-400"
          >
            Contact
          </Link>
          {!isAuthenticated && (
            <button
              onClick={() => setIsPostOpen((prev) => !isAuthenticated && !prev)}
            >
              <Link
                to="/contactUs"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                Sign In
              </Link>
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-white text-lg hover:text-gray-400"
            >
              LogOut
            </button>
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
