import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const CommentCard = ({ comment, key }) => {
  return (
    <div
      key={key}
      className="w-full bg-white shadow-lg rounded-lg overflow-hidden mb-4" // Full width and margin for spacing
    >
      {/* User Profile and Comment Section */}
      <div className="flex flex-col sm:flex-row items-start p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full mb-2 sm:mb-0"
            src={
              comment?.userId?.profileImage || "https://via.placeholder.com/150"
            }
            alt="User profile"
          />
        </div>
        <div className="ml-0 sm:ml-4 flex-1">
          <p className="text-lg font-semibold">@{comment?.userId?.fullName}</p>
          <p className="text-gray-600 text-sm">{comment?.userId?.email}</p>
        </div>
      </div>

      {/* Comment Text and Actions */}
      <div className="p-4 w-full">
        <ul className="space-y-4">
          <li className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-800 mb-2 sm:mb-0">{comment?.text}</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                <FaEdit size={16} />
              </button>
              <button className="text-red-500 hover:text-red-700 focus:outline-none">
                <FaTrash size={16} />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentCard;
