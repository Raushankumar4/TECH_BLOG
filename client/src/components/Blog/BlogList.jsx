import React from "react";

import AllBlog from "./AllBlog";
import Footer from "../Pages/Footer/Footer";

const BlogList = () => {
  return (
    <div className="w-full h-screen  dark:bg-gray-900 mt-14">
      <AllBlog />
      <Footer />
    </div>
  );
};

export default BlogList;
