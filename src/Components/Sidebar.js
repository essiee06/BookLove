import React from "react";
import { NavLink } from "react-router-dom";
import "@material-design-icons/font";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <ul>
        <li>
          <NavLink to="/home" end id="sidebar-Home">
            <span class="material-symbols-outlined">home</span>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" id="sidebar-Profile">
            <span class="material-symbols-outlined">account_circle</span>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/mybookclubs" id="sidebar-mybookclubs">
            <span class="material-symbols-outlined">diversity_4</span>
            My Book Clubs
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" id="sidebar-browse">
            <span class="material-symbols-outlined">diversity_1</span>
            Browse Clubs
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" id="sidebar-create">
            <span class="material-symbols-outlined">heart_plus</span>
            Create a Club
          </NavLink>
        </li>
        <li>
          <NavLink to="/" end ClassName="sidebar-logout">
            <span class="material-symbols-outlined">logout</span>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
