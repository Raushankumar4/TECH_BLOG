import React from "react";
import { useSelector } from "react-redux";
import AllBlogCard from "./AllBlogCar"; // Corrected import name
import { useGetAllPost } from "../../hooks/useGetAllPost";
import { Link } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";

const AllBlog = () => {
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  useGetAllPost();

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex flex-col">
      <div className="flex-1 p-4">
        {allVlogs && allVlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <span className="font-bold text-4xl">No vlogs found.</span>
            <Link
              to="/createVlog"
              className="text-lg bg-gray-800 text-white rounded-md shadow-md p-3"
            >
              Please create a vlog.
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-4 sm:grid-cols-1 lg:grid-cols-1 ">
            {allVlogs.map((vlogItem) => (
              <AllBlogCard vlog={vlogItem} key={vlogItem?._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
