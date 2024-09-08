import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url, vlog } from "../../constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateVlog = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    postImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const id = user?._id;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "postImage") {
      const file = files[0];
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: file,
      }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setUserInput((prevInput) => ({
      ...prevInput,
      postImage: null,
    }));
    setImagePreview(null);
  };

  const handleOnCreateVlog = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (userInput.postImage) {
        formData.append("postImage", userInput.postImage);
      }
      formData.append("title", userInput.title);
      formData.append("description", userInput.description);
      formData.append("id", id);
      const { data } = await axios.post(`${url}${vlog}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success(data?.message);
      navigate("/blog");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Create Vlog</h1>
      <form onSubmit={handleOnCreateVlog} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={userInput.title}
            onChange={handleOnChange}
            placeholder="Enter the title"
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={userInput.description}
            onChange={handleOnChange}
            placeholder="Enter the description"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            name="postImage"
            onChange={handleOnChange}
            placeholder="Upload an image"
            accept="image/*"
            className="mt-1 block opacity-0 w-full text-gray-900"
          />
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-auto object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition"
          >
            {isLoading ? "Loading..." : "Create Vlog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVlog;
