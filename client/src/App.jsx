// import { useEffect } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const App = () => {
  // const { user } = useSelector((store) => store.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
