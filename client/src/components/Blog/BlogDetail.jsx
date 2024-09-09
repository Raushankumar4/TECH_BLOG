import { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BlogDetail = ({ onWishlistClick = () => {} }) => {
  const [showComments, setShowComments] = useState(false);
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  const { id } = useParams();

  const vlog = allVlogs.find((vlog) => id === vlog?._id);
  console.log(vlog);

  // Format the date
  const postDate = new Date(vlog?.createdAt);
  const formattedDate = postDate.toLocaleDateString(); // e.g., "9/9/2024"
  const formattedTime = postDate.toLocaleTimeString(); // e.g., "3:45 PM"
  const year = postDate.getFullYear(); // e.g., 2024

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="relative p-4 bg-gray-200 overflow-hidden flex flex-col w-full max-w-full mx-auto transition-transform duration-300 ease-in-out transform border-t-gray-400 border">
      {/* Icons for update, delete, and wishlist */}
      <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <button
          onClick={onWishlistClick}
          className="text-yellow-500 hover:text-yellow-600 transition"
          aria-label="Wishlist"
        >
          <FaHeart size={24} />
        </button>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full border border-gray-300 mr-4"
            src={
              vlog?.userId?.profileImage ||
              "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"
            }
          />
          <span className="text-gray-900 font-medium text-lg">
            @{vlog?.userId?.fullName}
          </span>
        </div>

        {/* Title above description */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {vlog?.title || "Title"}
        </h2>
        <p className="text-gray-700 text-base mb-6">{vlog?.description}</p>

        {/* New Information: Categories and Date */}
        <div className="flex justify-between gap-2 mb-4">
          <span className="bg-gray-300 p-2 text-gray-700 text-xs px-2 py-1 rounded-full inline-block mb-2">
            {(vlog?.categories && vlog?.categories[0]) || "Category"}
          </span>
          <span className="text-gray-500 text-sm">
            {formattedDate} at {formattedTime} ({year})
          </span>
        </div>
      </div>

      <div className="relative">
        <img
          className="w-full rounded-md h-80 md:mx-auto md:h-80 object-cover"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPcs0BFfc4yvzXRgMPeBHO9AHvgS49Qtoqw&s"
          }
          alt="Vlog Cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          {/* Title is moved to be directly above description */}
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button
            onClick={handleCommentClick}
            className="bg-gray-400 text-black p-2 rounded-lg text-base hover:bg-gray-500 transition"
          >
            {vlog?.comments?.length === 0
              ? "No comments yet."
              : `all comments${vlog?.comments?.length}`}
          </button>
        </div>
        {showComments && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <ul className="space-y-4">
              <li className="p-4 bg-white rounded shadow-sm">
                <strong>Commenter 1:</strong> This is a great blog post!
              </li>
              <li className="p-4 bg-white rounded shadow-sm">
                <strong>Commenter 2:</strong> I found this very informative,
                thanks!
              </li>
              {"No comments yet."}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
