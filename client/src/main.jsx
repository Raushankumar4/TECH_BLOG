import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/Redux/Store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/Auth/SignUp/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />
    <Toaster position="top-center " reverseOrder={false} theme="dark" />
  </Provider>
);
