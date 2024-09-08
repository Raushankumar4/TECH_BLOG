import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
