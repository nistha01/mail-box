import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavBar.css"; 

const SideNavBar = () => {
  return (
    <div className="sidebar">
      <h2>Mail App</h2>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/inbox" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inbox
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/compose" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Compose
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sent" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sent
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavBar;
