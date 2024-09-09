import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllVlogs } from "../Redux/Store/Slices/vlogSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { url, vlogrl } from "../../constant";
import AllBlogCard from "./AllBlogCar";

const AllBlog = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const allVlogs = useSelector((state) => state.vlog.allVlogs);
  console.log("all", allVlogs);

  const fetchAllVlog = async () => {
    try {
      if (!token) return;

      const { data } = await axios.get(`${url}${vlogrl}/allposts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      dispatch(setAllVlogs(data?.posts));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllVlog();
  }, []);

  return (
    <div>
      {allVlogs?.length === 0 ? (
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
