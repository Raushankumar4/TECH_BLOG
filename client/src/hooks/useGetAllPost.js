import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url, vlogrl } from "../constant";
import axios from "axios";
import { setAllVlogs } from "../components/Redux/Store/Slices/vlogSlice";
import { errorToast, successToast } from "../components/Notify/Notify";

export const useGetAllPost = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.vlog.refresh);
  console.log("refresh", refresh);

  useEffect(() => {
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
      } catch (error) {
        errorToast(error?.response?.data?.message || error.message);
      }
    };

    fetchAllVlog();
  }, [refresh]);
};
