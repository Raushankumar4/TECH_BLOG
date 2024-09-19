import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllBlogCard from "./AllBlogCar";
import { useGetAllPost } from "../../hooks/useGetAllPost";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const AllBlog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  useGetAllPost();

  const filterdata = (allVlogs) => {
    if (!searchQuery) {
      return allVlogs;
    } else {
      return allVlogs.filter((vlog) =>
        vlog?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const filteredVlogs = filterdata(allVlogs);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex flex-col">
      <div className="flex justify-center mb-4 px-4">
        <div className="flex rounded-md mt-4 items-center shadow-lg bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Search vlogs..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 outline-none dark:bg-gray-800 text-gray-900 bg-gray-100 dark:text-white rounded-l-md"
          />
          <button className="text-white rounded-r-md p-2 flex items-center hover:bg-blue-600 transition duration-200 bg-gray-800 dark:bg-gray-700">
            <HiSearch className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        {filteredVlogs?.length === 0 ? (
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
          <div className="grid grid-cols-1 mx-4 sm:grid-cols-1 lg:grid-cols-1">
            {filteredVlogs?.map((vlogItem) => (
              <AllBlogCard vlog={vlogItem} key={vlogItem?._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
