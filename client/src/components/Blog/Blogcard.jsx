import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import GetVlogComments from "./GetVlogComments";
import { useGetAllVlogComments } from "../../hooks/useGetAllComments";
import { Link } from "react-router-dom";

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};

// Time ago function
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", value: 31536000 },
    { label: "month", value: 2592000 },
    { label: "day", value: 86400 },
    { label: "hour", value: 3600 },
    { label: "minute", value: 60 },
    { label: "second", value: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const BlogCard = ({ vlog, key, onDelete = () => {}, onUpdate = () => {} }) => {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state) => state.user.user);
  const getAllComent = useSelector((state) => state.vlog.comments);
  useGetAllVlogComments(vlog?._id);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  // Format the createdAt date
  const formattedDate = formatDate(vlog?.createdAt);
  const relativeTime = timeAgo(vlog?.createdAt);

  return (
    <div
      key={key}
      className="relative p-4 bg-gray-200 dark:bg-gray-900 overflow-hidden flex flex-col w-full md:mt-[4vw]  mt-[4vw] max-w-full mx-auto transition-transform duration-300 ease-in-out transform border-t-gray-400 border dark:border-gray-600"
    >
      {/* Icons for update, delete */}
      <div className="absolute top-20 right-4 flex space-x-4 z-10">
        <Link
          to={`/updateblog/${vlog?._id}`}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
          aria-label="Update"
        >
          <FaEdit size={24} />
        </Link>
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
        <div className="flex flex-col mb-4">
          {/* User profile and title */}
          <div className="flex items-center mb-4 pt-4">
            <img
              className="w-16 h-16  rounded-full border border-gray-300 dark:border-gray-600 mr-4"
              src={
                user?.profileImage ||
                "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"
              }
              alt="User Profile"
            />
            <span className="text-gray-900 dark:text-gray-100 font-medium text-lg">
              @{user?.fullName}
            </span>
          </div>

          {/* Title above description */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {vlog?.title}
          </h2>
          {/* Date and time */}

          <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
            {vlog?.description}
          </p>
          <div className="text-gray-500 flex justify-end dark:text-gray-400 text-sm mb-2">
            <div>
              {formattedDate} <span>{relativeTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-[80vh] flex items-center justify-center overflow-hidden relative">
          <img
            className="object-cover rounded-md"
            src={
              vlog?.postImage ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
            }
            alt="Vlog Cover"
          />
        </div>
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
