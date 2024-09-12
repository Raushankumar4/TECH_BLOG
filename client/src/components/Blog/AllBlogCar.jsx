import React from "react";
import { useNavigate } from "react-router-dom";

const AllBlogCard = ({ vlog, key }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${vlog?._id}`)}
      key={key}
      className="flex bg-white shadow-lg m-4 rounded-lg overflow-hidden dark:bg-gray-900"
    >
      {/* Left Side - Image */}
      <div className="flex-shrink-0">
        <img
          src={vlog?.postImage || "https://via.placeholder.com/150"}
          alt="Vlog Thumbnail"
          className="w-80 h-52 object-cover"
        />
      </div>

      {/* Right Side - Content */}
      <div className="p-4 flex-1">
        {/* Category */}
        <div className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full inline-block mb-2 dark:bg-gray-600 dark:text-gray-200">
          {(vlog?.categories && vlog?.categories[0]) || "Category"}
        </div>

        {/* Blog Title and Date */}
        <div className="text-xs flex justify-between text-gray-500 mb-2  dark:text-gray-400">
          <h2 className="text-xl font-semibold">{vlog?.title}</h2>
          <span>{vlog?.createdAt}</span>
        </div>

        {/* Username */}
        <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
          by @{vlog?.userId?.fullName}
        </p>

        {/* Description */}
        <p className="text-gray-800 mb-4 dark:text-gray-400">
          {vlog?.description || "Description"}
        </p>
      </div>
    </div>
  );
};

export default AllBlogCard;
