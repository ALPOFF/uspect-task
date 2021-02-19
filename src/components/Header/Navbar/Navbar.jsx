import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <nav className="navbar_container">
      <NavLink
        className="navbar_element"
        activeClassName="activeTab"
        to="/books"
      >
        <div>Книги</div>
      </NavLink>
      <NavLink
        className="navbar_element"
        activeClassName="activeTab"
        to="/characters"
      >
        <div>Персонажи</div>
      </NavLink>
      <NavLink
        className="navbar_element"
        activeClassName="activeTab"
        to="/family"
      >
        <div>Дома/Семьи</div>
      </NavLink>
      <NavLink
        className="navbar_element"
        activeClassName="activeTab"
        to="/favorites"
      >
        <div>Избранное</div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
