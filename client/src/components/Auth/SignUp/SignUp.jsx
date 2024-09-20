import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url, user } from "../../../constant";
import { errorToast, successToast } from "../../Notify/Notify";
import Modal from "../../Modal/Modal";
import Login from "../Login/Login";

const placeholderImage =
  "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const SignUp = () => {
  const [imagePreview, setImagePreview] = useState(placeholderImage);
  const [errors, setErrors] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    profileImage: null,
  });
  const navigate = useNavigate();

  const handleInChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      if (file) {
        setUserInput((prevInput) => ({
          ...prevInput,
          [name]: file,
        }));

        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(placeholderImage);
        setUserInput((prevInput) => ({
          ...prevInput,
          [name]: null,
        }));
      }
    } else {
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview !== placeholderImage) {
      URL.revokeObjectURL(imagePreview);
    }

    setUserInput((prev) => ({ ...prev, profileImage: null }));
    setImagePreview(placeholderImage);
  };

  const validateInput = () => {
    const newErrors = {};
    if (!userInput.fullName) newErrors.fullName = "Full Name is required";
    if (!userInput.email) newErrors.email = "Email is required";
    if (!userInput.username) newErrors.username = "Username is required";
    if (!userInput.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", userInput.fullName);
      formData.append("email", userInput.email);
      formData.append("username", userInput.username);
      formData.append("password", userInput.password);
      if (userInput.profileImage)
        formData.append("profileImage", userInput.profileImage);

      const { data } = await axios.post(`${url}${user}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      successToast(data.message);
      navigate("/");
      setIsLoginOpen(true);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== placeholderImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col items-center  dark:border-gray-300 justify-center bg-gray-200 p-4 dark:text-white dark:bg-gray-900 ">
      <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-900 ">
        <div className="grid gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <input
                onChange={handleInChange}
                type="file"
                accept="image/*"
                name="profileImage"
                className="absolute top-14 left-5 opacity-0 bg-gray-200 w-20  z-50 cursor-pointer"
                disabled={isLoading}
              />
              <div className="relative flex justify-center items-center">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-300"
                />
                {imagePreview !== placeholderImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isLoading}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-lg border border-gray-300 text-black text-lg"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-4">Create an Account</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign up to start your journey with us.
            </p>
          </div>

          {/* Form Section */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  value={userInput.fullName}
                  type="text"
                  name="fullName"
                  onChange={handleInChange}
                  disabled={isLoading}
                  placeholder="Enter your full name"
                  className="block w-full px-3 py-2 dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.fullName && (
                  <div className="text-red-500 text-xs">{errors.fullName}</div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  value={userInput.username}
                  type="text"
                  disabled={isLoading}
                  name="username"
                  onChange={handleInChange}
                  placeholder="Enter your profession"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.username && (
                  <div className="text-red-500 text-xs">{errors.username}</div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  value={userInput.email}
                  type="email"
                  name="email"
                  disabled={isLoading}
                  onChange={handleInChange}
                  placeholder="Enter your email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <div className="text-red-500 text-xs">{errors.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userInput.password}
                  onChange={handleInChange}
                  disabled={isLoading}
                  placeholder="Enter a password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <div className="text-red-500 text-xs">{errors.password}</div>
                )}
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-4 py-2 bg-gray-600 dark:bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login />
      </Modal>
    </div>
  );
};

export default SignUp;
