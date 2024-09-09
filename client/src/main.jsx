import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/Redux/Store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/Auth/SignUp/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login/Login.jsx";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import PageNotFound from "./components/Pages/NotFound/PageNotFound.jsx";
import Profile from "./components/Pages/Profile/Profile.jsx";
import HomePage from "./components/Home/Home.jsx";
import Blog from "./components/Blog/Blog.jsx";
import CreateVlog from "./components/Blog/CreateVlog.jsx";
import BlogList from "./components/Blog/BlogList.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "createVlog",
        element: <CreateVlog />,
      },
      {
        path: "bloglist",
        element: <BlogList />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} theme="dark" />
    </PersistGate>
  </Provider>
);
