import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./Blogcard";
import { useGetMyPost } from "../../hooks/useGetMyPost";
import axios from "axios";
import { url, vlogrl } from "../../constant";
import { deleteVlog, getRefresh } from "../Redux/Store/Slices/vlogSlice";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../Notify/Notify";

const Blog = () => {
  const userId = useSelector((state) => state.user.user);
  const vlog = useSelector((state) => state.vlog.myVlogs);
  const token = useSelector((state) => state.auth.token);
  const id = userId?._id;
  const dispatch = useDispatch();
  useGetMyPost(id);

  const handleDelete = async (vlogId) => {
    try {
      const { data } = await axios.delete(`${url}${vlogrl}/delete/${vlogId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getRefresh());
      dispatch(deleteVlog({ id: vlogId }));
      successToast(data?.message);
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {vlog?.length === 0 ? (
        <div className="flex bg-gray-200 dark:bg-gray-900 flex-col items-center justify-center h-screen w-full text-center ">
          <span className="font-bold text-4xl">No vlogs found.</span>
          <Link
            className="my-2 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:scale-110 duration-200  transition-all ease-in-out hover:bg-gray-700 hover:shadow-xl  "
            to="/createVlog"
          >
            Create Vlog
          </Link>
        </div>
      ) : (
        vlog?.map((vlogItem) => (
          <BlogCard
            vlog={vlogItem}
            key={vlogItem._id}
            onDelete={() => handleDelete(vlogItem._id)}
          />
        ))
      )}
    </div>
  );
};

export default Blog;
