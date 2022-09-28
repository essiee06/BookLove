import React from "react";
import * as icon from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className={styles.sidenav}>
      <ul>
        <li>
          <Link to="/home" ClassName="sidebar-Home">
            <icon.FaHome className={styles.icon} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" ClassName="sidebar-Profile">
            <icon.FaUser className={styles.icon} />
            Profile
          </Link>
        </li>
        <li>
          <Link to="/mybookclubs" ClassName="sidebar-mybookclubs">
            <icon.FaBook className={styles.icon} />
            My Book Clubs
          </Link>
        </li>
        <li>
          <Link to="/browse" ClassName="sidebar-browse">
            <icon.FaSearchengin className={styles.icon} />
            Browse Clubs
          </Link>
        </li>
        <li>
          <Link to="/create" ClassName="sidebar-create">
            <icon.FaAdversal className={styles.icon} />
            Create a Club
          </Link>
        </li>

        <li className={styles.sidebarLogout}>
          <Link to="/logout" className={styles.sidebarLogout}>
            <icon.FaSignOutAlt className={styles.Logouticon} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
