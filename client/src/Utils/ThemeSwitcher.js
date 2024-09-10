import React from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../components/Redux/Store/Slices/themeslice";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();

  const handleSetLightTheme = () => {
    dispatch(setTheme("light"));
  };

  const handleSetDarkTheme = () => {
    dispatch(setTheme("dark"));
  };

  return (
    <div>
      <button
        onClick={handleSetLightTheme}
        className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
      >
        Light
      </button>
      <button
        onClick={handleSetDarkTheme}
        className="px-4 py-2 m-2 bg-gray-800 text-white rounded"
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitcher;
