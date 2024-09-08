import { useSelector } from "react-redux";
import BlogCard from "./Blogcard.k";
import CreateVlog from "./CreateVlog";
import { useGetMyPost } from "../../hooks/useGetMyPost";

const Blog = () => {
  const user = useSelector((state) => state.user.user);
  const vlog = useSelector((state) => state.vlog.myVlogs);

  const id = user?._id;
  useGetMyPost(id);

  return (
    <div>
      {vlog?.map((vlog, index) => (
        <BlogCard vlog={vlog} key={index} />
      ))}

      <CreateVlog />
    </div>
  );
};

export default Blog;
