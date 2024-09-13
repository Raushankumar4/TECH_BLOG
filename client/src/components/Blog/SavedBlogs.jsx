import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSavedPost } from "../../hooks/useGetSavedPost";
import axios from "axios";
import { url, user } from "../../constant";
import { getRefresh } from "../Redux/Store/Slices/vlogSlice";
import { errorToast, successToast } from "../Notify/Notify";

const SavedBlogs = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user?.user?._id);
  const token = useSelector((state) => state.auth.token);
  useGetSavedPost(id);
  const savedVlogs = useSelector((state) => state.vlog.savedVlogs);
  console.log(savedVlogs);
  const dispatch = useDispatch();

   const handleRemoveBlog = async (blogId) => {
    if (!token) {
      navigate("/login");
    }
    try {
      const { data } = await axios.post(
        `${url}${user}/unsavepost`,
        {
          postId: blogId,
          userId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh(true));
      successToast(data?.message);
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Saved Blogs
      </h1>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedVlogs.length === 0 ? (
          <p className="text-gray-600 h-screen dark:text-gray-300">No saved blogs.</p>
        ) : (
          savedVlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={
                  blog?.postImage ||
                  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
                }
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {blog.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {blog.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleRemoveBlog(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-base hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default SavedBlogs;
