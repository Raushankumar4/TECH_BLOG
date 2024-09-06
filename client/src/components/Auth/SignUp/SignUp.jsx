import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultImage from "../../../../public/default.jpg";
import axios from "axios";
import { url, user } from "../../../constant";
import toast from "react-hot-toast";

const SignUp = () => {
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [errors, setErrors] = useState({});
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
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: file,
      }));
      setImagePreview(file ? URL.createObjectURL(file) : defaultImage);
    } else {
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setUserInput((prev) => ({ ...prev, profileImage: null }));
    setImagePreview(defaultImage);
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
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== defaultImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <input
                    onChange={handleInChange}
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    className="absolute opacity-0 inset-6 z-50 cursor-pointer"
                  />
                  <div className="relative flex justify-center items-center">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className={`w-28 h-28 rounded-full object-cover shadow-md border border-gray-300 ${
                        imagePreview === defaultImage
                          ? "opacity-100"
                          : "opacity-100"
                      }`}
                    />
                    {imagePreview !== defaultImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-1 bg-white p-1 rounded-full shadow-lg border border-gray-300 text-black text-lg"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-gray-500">
                Sign up to start your journey with us.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
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
                  placeholder="Enter your full name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.fullName && (
                  <div className="text-red-500">{errors.fullName}</div>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  value={userInput.username}
                  type="text"
                  name="username"
                  onChange={handleInChange}
                  placeholder="Choose a username"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.username && (
                  <div className="text-red-500">{errors.username}</div>
                )}
              </div>
              <div className="grid gap-2">
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
                  onChange={handleInChange}
                  placeholder="Enter your email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="grid gap-2">
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
                  placeholder="Enter a password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
