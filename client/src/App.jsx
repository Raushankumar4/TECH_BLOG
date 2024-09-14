import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
