// import React from "react";
// import BlogCard from "../Blog/Blog";
// import { useSelector } from "react-redux";

// const BlogList = () => {
//   const vlog = useSelector((state) => state.vlog.myVlogs);
//   console.log("vlog", vlog);

//   const handleUpdate = (vlogId) => {
//     // Logic for updating the vlog, e.g., redirect to an edit page or open a modal
//     console.log(`Update vlog with ID: ${vlogId}`);
//   };

//   const handleDelete = (vlogId) => {
//     // Logic for deleting the vlog, e.g., send a request to delete the item
//     console.log(`Delete vlog with ID: ${vlogId}`);
//   };

//   const handleWishlistClick = (vlogId) => {
//     // Logic for handling wishlist click
//     console.log(`Wishlist vlog with ID: ${vlogId}`);
//   };

//   // Example vlog data
//   const vlogs = [
//     {
//       id: 1,
//       title: "Blog Post 1",
//       description: "This is the first blog post.",
//       postImage: "https://example.com/image1.jpg",
//     },
//     // Add more vlogs here
//   ];

//   return (
//     <div>
//       {vlogs.map((vlog) => (
//         <BlogCard
//           key={vlog.id}
//           vlog={vlog}
//           onUpdate={() => handleUpdate(vlog.id)}
//           onDelete={() => handleDelete(vlog.id)}
//           onWishlistClick={() => handleWishlistClick(vlog.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default BlogList;
