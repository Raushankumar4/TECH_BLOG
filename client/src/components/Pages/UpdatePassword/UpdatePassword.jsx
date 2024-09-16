import React, { useState } from "react";
import { useSelector } from "react-redux";
import { url, user } from "../../../constant";
import axios from "axios";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../../Notify/Notify";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.user);
  const id = userId?._id;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { currentPassword, newPassword, confirmPassword } = userInput;

    if (!token) {
      toast.error("Please login first");
      setIsLoading(false);
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    if (newPassword.length <= 6) {
      toast.error("Password must be longer than 6 characters");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.put(
        `${url}${user}/updatepassword/${id}`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      successToast(data?.message);
      navigate("/profile");
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-md mx-8 p-8 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-lg dark:shadow-gray-800/100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Change Password
        </h2>
        <form className="space-y-4" onSubmit={changePassword}>
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={userInput.currentPassword}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Current Password"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm  font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={userInput.newPassword}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600  bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-100"
              placeholder="New Password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={userInput.confirmPassword}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600  bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Confirm New Password"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 ${
              isLoading ? "bg-gray-400" : "bg-gray-600"
            } text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 dark:bg-gray-800 focus:ring-blue-500 dark:hover:bg-gray-600`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
