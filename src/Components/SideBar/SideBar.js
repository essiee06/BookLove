import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "@material-design-icons/font";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./SideBar.css";
const Sidebar = () => {
  let navigate = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="sidenav">
      <ul>
        <li>
          <Link to="/" href="/home" end id="sidebar-Home">
            <span class="material-symbols-outlined" href="home">home</span>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" id="sidebar-Profile" >
            <span class="material-symbols-outlined" >account_circle</span>
            Profile
          </Link>
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
          <NavLink to="/" end ClassName="sidebar-logout" onClick={logOut}>
            <span class="material-symbols-outlined">logout</span>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
