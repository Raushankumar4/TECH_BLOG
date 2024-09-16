import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url, user } from "../constant";
import { errorToast } from "../components/Notify/Notify";
import axios from "axios";
import { setSavedVlogs } from "../components/Redux/Store/Slices/vlogSlice";

export const useGetSavedPost = (userId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.vlog.refresh);
  // const path = window.location.pathname;

  useEffect(() => {
    const fetchAllSavedPost = async () => {
      try {
        if (!token) return;

        const { data } = await axios.get(
          `${url}${user}/getsavedPost/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        dispatch(setSavedVlogs(data?.savedPosts));

        // if (path === "/blog") successToast(data?.message);
      } catch (error) {
        errorToast(error?.response?.data?.message || error.message);
      }
    };

    fetchAllSavedPost();
  }, [refresh]);
};
