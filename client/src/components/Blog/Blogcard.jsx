import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit, FaHeart } from "react-icons/fa";
import GetVlogComments from "./GetVlogComments";

const BlogCard = ({ vlog, key, onDelete = () => {}, onUpdate = () => {} }) => {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state) => state.user.user);
  const getAllComent = useSelector((state) => state.vlog.comments);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div
      key={key}
      className="relative p-4 bg-gray-200 dark:bg-gray-800 overflow-hidden flex flex-col w-full max-w-full mx-auto transition-transform duration-300 ease-in-out transform border-t-gray-400 border dark:border-gray-600"
    >
      {/* Icons for update, delete, and wishlist */}
      <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <button
          onClick={onUpdate}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
          aria-label="Update"
        >
          <FaEdit size={24} />
        </button>
        <button
          onClick={() =>
            confirm("Are you sure you want to delete this vlog?") && onDelete()
          }
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition"
          aria-label="Delete"
        >
          <FaTrash size={24} />
        </button>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 mr-4"
            src={
              user?.profileImage ||
              "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"
            }
          />
          <span className="text-gray-900 dark:text-gray-100 font-medium text-lg">
            @{user?.fullName}
          </span>
        </div>
        {/* Title above description */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {vlog?.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
          {vlog?.description}
        </p>
      </div>

      <div className="relative">
        <img
          className="w-full rounded-md h-80 md:mx-auto md:h-80 object-cover"
          src={
            vlog?.postImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPcs0BFfc4yvzXRgMPeBHO9AHvgS49Qtoqw&s"
          }
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          {/* Title is moved to be directly above description */}
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button
            onClick={handleCommentClick}
            className="bg-gray-400 dark:bg-gray-700 text-black dark:text-gray-200 p-2 rounded-lg text-base hover:bg-gray-500 dark:hover:bg-gray-600 transition"
          >
            {vlog?.comments?.length === 0
              ? "No comments yet."
              : `All comments (${getAllComent?.length})`}
          </button>
        </div>
        {showComments && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Comments
            </h3>
            <ul className="space-y-4">
              <li className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
                <strong>Commenter</strong>
                <GetVlogComments />
              </li>
            </ul>
            {vlog?.comments?.length === 0 && "No comments yet."}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
