import { useEffect } from "react";
import { setComment } from "../components/Redux/Store/Slices/vlogSlice";
import axios from "axios";
import { url, vlogrl } from "../constant";
import { useDispatch, useSelector } from "react-redux";

export const useGetAllVlogComments = (vlogId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.vlog.refresh);
  useEffect(() => {
    const fecthAllComents = async () => {
      try {
        const { data } = await axios.get(`${url}${vlogrl}/comment/${vlogId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(data);
        dispatch(setComment(data?.comments));
      } catch (error) {
        console.log(error);
      }
    };
    fecthAllComents();
  }, [refresh, vlogId, token]);
};
