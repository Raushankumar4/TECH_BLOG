import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { url, vlogrl } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { errorToast, successToast } from "../Notify/Notify";

const CreateVlog = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    postImage: null,
    categories: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newCategory, setNewCategory] = useState("");
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

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !userInput.categories.includes(newCategory.trim())
    ) {
      setUserInput((prevInput) => ({
        ...prevInput,
        categories: [...prevInput.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      categories: prevInput.categories.filter(
        (category) => category !== categoryToRemove
      ),
    }));
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
      formData.append("categories", userInput.categories);
      const { data } = await axios.post(`${url}${vlogrl}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      successToast(data?.message);
      navigate("/myBlog");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorToast(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <>
      <div className="w-full  dark:bg-gray-900 flex justify-center items-center">
        <div className="md:mt-[8vw] mt-[30vw] max-w-full md:max-w-4xl w-full mb-10 mx-5">
          <motion.div
            className="max-w-3xl md:mx-auto w-full  p-4 sm:p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              <Link
                to={-1}
                className="mx-4 rounded-md text-xl text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                ←
              </Link>
              Create Vlog
            </h1>
            <form onSubmit={handleOnCreateVlog} className="space-y-6">
              {/* Title Input */}
              <motion.div
                className="animate-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={userInput.title}
                  onChange={handleOnChange}
                  placeholder="Enter the title"
                  className="mt-1 block w-full  bg-gray-100 text-gray-400 border border-gray-300 rounded-lg p-3  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </motion.div>

              {/* Description Input */}
              <motion.div
                className="animate-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="mt-1  bg-gray-100 text-gray-400 block w-full border border-gray-300 rounded-lg p-3  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </motion.div>

              {/* Categories Input */}
              <motion.div
                className="animate-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Categories (Add multiple by pressing Enter)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add a category"
                    className="mt-1 block  bg-gray-100 text-gray-400 w-full border border-gray-300 rounded-lg p-3  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-600 transition dark:bg-gray-700 dark:hover:bg-gray-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userInput.categories.map((category) => (
                    <motion.span
                      key={category}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-2 dark:bg-gray-600 dark:text-gray-300"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>{category}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                      >
                        &times;
                      </button>
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Image Upload */}
              <motion.div
                className="animate-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="mt-1 block opacity-0 w-full text-gray-900 dark:text-gray-200"
                />
                {/* Image Preview */}
                {imagePreview && (
                  <motion.div
                    className="mt-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="animate-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <button
                  disabled={isLoading}
                  type="submit"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-600 transition dark:bg-gray-700 dark:hover:bg-gray-700"
                >
                  {isLoading ? "Loading..." : "Create Vlog"}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CreateVlog;
