import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url, user } from "../../../constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginSuccess } from "../../Redux/Store/Slices/authslice";
import { setUser } from "../../Redux/Store/Slices/userSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

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
      toast.success(data?.message);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
          <p className="text-gray-500">Access your account.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handleOnChange}
              value={userInput.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={handleOnChange}
              value={userInput.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        <div className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?
          <Link to="/signup" className="font-medium text-blue-600 underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
