import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { url, vlogrl } from "../../constant";
import axios from "axios";
import { setComment } from "../Redux/Store/Slices/vlogSlice";

const GetVlogComments = () => {
  const { id } = useParams();
  const vlog = useSelector((state) => state.vlog.allVlogs);
  const refresh = useSelector((state) => state.vlog.refresh);
  const vlogId = vlog?.find((vlog) => vlog?._id === id);
  const token = useSelector((state) => state.auth.token);
  console.log("hdhd", vlogId?._id);
  const dispatch = useDispatch();

  const fetchAllComents = async () => {
    try {
      const { data } = await axios.get(
        `${url}${vlogrl}/comment/${vlogId?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(data);
      dispatch(setComment(data?.comment));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllComents();
  }, [refresh]);

  return <div>GetVlogComments</div>;
};

export default GetVlogComments;
