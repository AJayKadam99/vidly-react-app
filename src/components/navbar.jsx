import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
