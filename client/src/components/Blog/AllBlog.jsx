import React from "react";
import { useSelector } from "react-redux";
import AllBlogCard from "./AllBlogCar";
import { useGetAllPost } from "../../hooks/useGetAllPost";

const AllBlog = () => {
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  console.log("all", allVlogs);
  useGetAllPost();

  return (
    <div>
      {allVlogs && allVlogs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center ">
          <span className="font-bold text-4xl">No vlogs found.</span>
        </div>
      ) : (
        allVlogs?.map((vlogItem) => (
          <AllBlogCard vlog={vlogItem} key={vlogItem?._id} />
        ))
      )}
    </div>
  );
};

export default AllBlog;
