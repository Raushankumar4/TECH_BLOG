import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url, user } from "../../../constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginSuccess } from "../../Redux/Store/Slices/authslice";
import { setUser } from "../../Redux/Store/Slices/userSlice";
import Modal from "../../Modal/Modal";
import SignUp from "../SignUp/SignUp";
import { errorToast, successToast } from "../../Notify/Notify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navgivate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInp) => ({
      ...prevInp,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${url}${user}/login`, userInput, {
        withCredentials: true,
      });
      setIsLoading(false);
      dispatch(loginSuccess({ token: data?.token }));
      dispatch(setUser(data?.user));
     successToast(data?.message);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      errorToast(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex dark:bg-gray-900 flex-col items-center justify-center   p-4 sm:p-8">
      <div className="w-full max-w-md p-6  dark:bg-gray-900 dark:border-gray-800 dark:border-[1px] rounded-lg shadow-lg bg-white">
        <div className="text-center mb-6  dark:text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-white">Access your account.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 ">
          <div className="grid gap-2 ">
            <label
              htmlFor="email"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handleOnChange}
              value={userInput.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px]"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Password
            </label>
            <input
              onChange={handleOnChange}
              value={userInput.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:border-[1px]"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>
        <div
          disabled={isLoading}
          className="mt-4 text-sm text-gray-500 text-center"
        >
          Dont have an account?
          <button
            onClick={() => setIsOpenModal((prev) => !prev)}
            to="/signup"
            className="font-medium text-blue-600 underline"
          >
            Sign Up
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() =>
          setIsOpenModal(() => {
            navgivate("/");
          })
        }
      >
        <SignUp />
      </Modal>
    </div>
  );
};

export default Login;
