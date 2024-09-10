import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../components/Redux/Store/Slices/themeslice";
import { FaSun, FaMoon } from "react-icons/fa"; // Import the icons

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {theme === "" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
