import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetSavedPost } from "../../hooks/useGetSavedPost";

const SavedBlogs = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user?.user?._id);
  // Sample blog data
  console.log(id);
  
  useGetSavedPost(id);
  const savedBlogs = [
    {
      _id: "1",
      title: "My First Blog",
      description: "This is a description of my first blog post.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      _id: "2",
      title: "Another Blog",
      description: "This is a description of another blog post.",
      image: "https://via.placeholder.com/300x200",
    },
    // Add more blogs as needed
  ];

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleRemoveBlog = (blogId) => {
    // Handle removal logic
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBlogs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No saved blogs.</p>
        ) : (
          savedBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {blog.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {blog.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleViewBlog(blog._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View
                  </button>
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
