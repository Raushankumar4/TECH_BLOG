import { useState } from "react";

const BlogCard = ({
  title = "Blog Title",
  description = "Blog description goes here.",
  imageUrl = "default.jpg",
  username = "User Name",
  onWishlistClick = () => {},
  vlog,
  key,
}) => {
  const [showComments, setShowComments] = useState(false);
  console.log("vlog", vlog);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-gray-200 shadow-lg overflow-hidden flex flex-col w-full max-w-full mx-auto transition-transform duration-300 ease-in-out transform border-t-gray-400 border">
      <div className="p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full border border-gray-300 mr-4"
            src="https://via.placeholder.com/70x70"
            alt={username}
          />
          <span className="text-gray-900 font-medium text-lg">{username}</span>
        </div>
        <p className="text-gray-700 text-base mb-6">{vlog?.description}</p>
      </div>

      <div className="relative">
        <img
          className="w-full h-80 md:mx-auto  md:h-80 object-cover"
          src={vlog?.postImage}
          alt={title}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          <h2 className="text-2xl font-bold">{vlog?.title}</h2>
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button
            onClick={onWishlistClick}
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg text-base hover:bg-yellow-500 transition mb-4 md:mb-0"
          >
            Wishlist
          </button>
          <button
            onClick={handleCommentClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition"
          >
            Comment
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
              {vlog?.comments?.length || "No comments yet."}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
