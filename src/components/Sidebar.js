import Logo from "../assets/images/PS logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import  "../styles/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <img src={Logo} alt="Prajñan Software" className="logo" />
      <h2 className="sidebar-title">Prajñan Software</h2>
      <button className="sidebar-btn" onClick={() => navigate("/dashboard")}>
        All Applications
      </button>
      <button className="sidebar-btn" onClick={() => navigate("/accepted")}>
        Accepted Applications
      </button>
      <button className="sidebar-btn" onClick={() => navigate("/rejected")}>
        Rejected Applications
      </button>
      <button className="sidebar-btn" onClick={() => navigate("/deleted")}>
        Deleted Applications
      </button>
    </div>
  );
};

export default Sidebar;
