import { useSelector } from "react-redux";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const theme = useSelector((state) => state.theme.theme);

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
