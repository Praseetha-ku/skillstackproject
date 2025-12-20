import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../assets/styles/layout.css";

function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />

      <div className="layout-right">
        <Navbar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
