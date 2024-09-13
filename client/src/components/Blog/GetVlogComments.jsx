import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { url, vlogrl } from "../../constant";
import axios from "axios";
import { getRefresh, setComment } from "../Redux/Store/Slices/vlogSlice";
import CommentCard from "./CommentCard";
import toast from "react-hot-toast";
import { useGetAllVlogComments } from "../../hooks/useGetAllComments";

const GetVlogComments = () => {
  const { id } = useParams();
  const vlog = useSelector((state) => state.vlog.allVlogs);
  const vlogId = vlog?.find((vlog) => vlog?._id === id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const commenList = useSelector((state) => state.vlog.comments);

  useGetAllVlogComments(vlogId?._id);

  // delete Comment
  const deleteComment = async (commentId) => {
    try {
      const { data } = await axios.delete(
        `${url}${vlogrl}/deletecomment/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {commenList?.map((comment) => (
        <CommentCard
          onDelete={() => deleteComment(comment?._id)}
          onUpdate={() => {}}
          comment={comment}
          key={comment?._id}
        />
      ))}
    </div>
  );
};

export default GetVlogComments;
