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

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} theme="dark" />
    </PersistGate>
  </Provider>
);
