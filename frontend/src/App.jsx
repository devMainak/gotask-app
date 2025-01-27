import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/nav/Header";
import Sidebar from "./components/nav/Sidebar";

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="d-flex justify-content-between gap-5">
          <Sidebar />
          <div className="flex-grow-1 container">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
