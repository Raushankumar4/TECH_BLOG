import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url, vlogrl } from "../../constant";
import { toast } from "react-hot-toast";
import { getRefresh } from "../Redux/Store/Slices/vlogSlice";
import GetVlogComments from "./GetVlogComments";
import { useEffect } from "react";

const BlogDetail = ({ onWishlistClick = () => {} }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const vlog = allVlogs.find((vlog) => id === vlog?._id);
  const getAllComent = useSelector((state) => state.vlog.comments);

  // Format the date
  const postDate = new Date(vlog?.createdAt);
  const formattedDate = postDate.toLocaleDateString(); // e.g., "9/9/2024"
  const formattedTime = postDate.toLocaleTimeString(); // e.g., "3:45 PM"
  const year = postDate.getFullYear(); // e.g., 2024

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const [addComment, setAddComment] = useState({
    text: "",
    userId: "",
    vlogId: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddComment((prev) => ({
      ...prev,
      [name]: value,
      userId: user?._id,
      vlogId: vlog?._id,
    }));
  };

  const handleOnComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}${vlogrl}/comment`, addComment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch(getRefresh());
      setShowComments(true);
      toast.success(data?.message);
      setAddComment({ text: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative  p-4 bg-gray-200 overflow-hidden flex flex-col w-full max-w-full mx-auto transition-transform duration-300 ease-in-out transform border-t-gray-400 border">
      {/* Icons for back and wishlist */}
      <div className="absolute top-10 right-10 flex space-x-4 z-10 ">
        <button
          onClick={onWishlistClick}
          className="relative group hover:text-red-600 transition"
          aria-label="Wishlist"
        >
          <FaHeart size={24} />
          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 p-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity text-nowrap">
            Add to favorites
          </span>
        </button>
        <button
          onClick={handleBackClick}
          className="text-gray-700 hover:text-gray-900 transition"
          aria-label="Back"
        >
          <HiArrowLeft size={24} />
          <span className="absolute bottom-full right-0 mb-2 p-1 text-xs text-white bg-black rounded opacity-0 hover:opacity-100 transition-opacity text-nowrap">
            go back
          </span>
        </button>
      </div>

      <div className="p-6 flex flex-col ">
        <div className="flex items-center mb-4 ">
          <img
            className="w-16 h-16 rounded-full border border-gray-400 mr-4"
            src={
              vlog?.userId?.profileImage ||
              "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"
            }
            alt="User Profile"
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
          className="w-full rounded-md h-80 object-cover"
          src={
            vlog?.postImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPcs0BFfc4yvzXRgMPeBHO9AHvgS49Qtoqw&s"
          }
          alt="Vlog Cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          {/* Title overlay on image */}
          <h2 className="text-2xl font-bold">{vlog?.title || "Title"}</h2>
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button
            onClick={() => handleCommentClick()}
            className="bg-gray-400 text-black p-2 rounded-lg text-base hover:bg-gray-500 transition"
          >
            {getAllComent?.length === 0
              ? "No comments yet."
              : `All comments ${getAllComent?.length}`}
          </button>
          <div>
            {!showComments && (
              <>
                <input
                  className="w-fit p-2 mx-2 rounded-lg ring-1 ring-gray-400 focus:outline-gray-300 outline-none "
                  name="text"
                  type="text"
                  placeholder="Add a comment "
                  onChange={handleOnChange}
                  value={addComment.text}
                  required
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  disabled={isLoading}
                  onClick={handleOnComment}
                  className="bg-black text-white p-2 rounded-lg text-base hover:bg-gray-500 transition"
                >
                  {isLoading ? "Commenting..." : `${"Comment"} `}
                </button>
              </>
            )}
          </div>
        </div>
        {showComments && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <ul className="space-y-8 w-full">
              <li className="p-4 bg-white rounded shadow-sm w-full">
                <GetVlogComments />
              </li>
              <li className="p-4  rounded shadow-sm">
                <div>
                  <input
                    className="w-fit p-2 mx-2 rounded-lg ring-1 ring-gray-400 focus:outline-gray-300 outline-none "
                    name="text"
                    type="text"
                    placeholder="Add a comment "
                    onChange={handleOnChange}
                    value={addComment.text}
                    required
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <button
                    disabled={isLoading}
                    onClick={handleOnComment}
                    className="bg-black text-white p-2 rounded-lg text-base hover:bg-gray-500 transition"
                  >
                    {isLoading ? "Commenting..." : "Comment"}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;