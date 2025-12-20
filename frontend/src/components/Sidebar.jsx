
import { NavLink } from "react-router-dom";
import "../assets/styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-box">
      <h2 className="sidebar-title">SkillStack</h2>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/skills" className="sidebar-link">
          Goals List
        </NavLink>

        <NavLink to="/skills/add" className="sidebar-link">
          Add Goal
        </NavLink>
        <NavLink to="/skills/add/daily" className="sidebar-link">
          Add Daily Goal
        </NavLink>
        <NavLink to="/logs" className="sidebar-link">
          Track daily Goal
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
