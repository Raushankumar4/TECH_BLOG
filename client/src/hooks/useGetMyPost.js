import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url, vlogrl } from "../constant";
import { setMyVlogs } from "../components/Redux/Store/Slices/vlogSlice";
import { errorToast } from "../components/Notify/Notify";

export const useGetMyPost = (id) => {
  const token = useSelector((state) => state.auth.token);
  const refresh = useSelector((state) => state.vlog.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyVlof = async () => {
      try {
        if (!id || !token) return;

        const { data } = await axios.get(`${url}${vlogrl}/myposts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setMyVlogs(data?.posts));
      } catch (error) {
        errorToast(error?.response?.data?.message || error.message);
      }
    };

    fetchMyVlof();
  }, [refresh]);
};
