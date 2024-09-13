import React from "react";
import { useSelector } from "react-redux";
import AllBlogCard from "./AllBlogCar";
import { useGetAllPost } from "../../hooks/useGetAllPost";
import { Link } from "react-router-dom";

const AllBlog = () => {
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  console.log("all", allVlogs);
  useGetAllPost();

  const handleWishlistClick = (vlogId) => {
    console.log(vlogId);
  };

  return (
    <div>
      {allVlogs && allVlogs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center space-y-4">
          <span className="font-bold text-4xl">No vlogs found.</span>
          <Link
            to="/createVlog"
            className="text-lg bg-gray-800 rounded-md shadow-md p-3"
          >
            Please create a vlog.
          </Link>
        </div>
      ) : (
        allVlogs?.map((vlogItem) => (
          <AllBlogCard
            vlog={vlogItem}
            key={vlogItem?._id}
            onWishlistClick={() => handleWishlistClick(vlogItem?._id)}
          />
        ))
      )}
    </div>
  );
};

export default AllBlog;
