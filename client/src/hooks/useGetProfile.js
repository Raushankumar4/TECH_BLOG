import axios from "axios";
import { url, user } from "../constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const useGetProfile = (id) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchMyProfile = async () => {
      if (!id || !token) return;

      try {
        const { data } = await axios.get(`${url}${user}/profile/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        toast.success(data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        if (error?.response) {
          const { status, data } = error.response;

          if (status === 401) {
            console.log("Unauthorized. Redirecting to login...");
            navigate("/login");
          } else if (status === 403) {
            console.log("Forbidden. Access denied.");
          } else {
            console.log("Error response status:", status);
            console.log("Error response data:", data);
          }
        } else {
          console.log("Error message:", error.message);
        }
      }
    };

    fetchMyProfile();
  }, [id, token, navigate]);
};
