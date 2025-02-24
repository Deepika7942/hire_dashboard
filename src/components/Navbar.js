import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

import  "../styles/styles.css";
const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Search Applications by ID, Name, or Position..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <FiBell className="nav-icon" title="Notifications" />
      <FiUser className="nav-icon" title="Profile" />
    </div>
  );
};

export default Navbar;
