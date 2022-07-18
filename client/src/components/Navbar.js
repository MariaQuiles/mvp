import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChangeView = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

  return (
    <nav className="navbar text-white bg-dark">
      <ul>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            {/*make it to the login form*/}
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            User
          </NavLink>
        </li>
        {/* Only show "Members Only" if user is logged in */}
        {props.user && props.user.isadmin !== 0 ? (
          <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>

            <div>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/post">
                  Post a new offer
                </NavLink>
              </li>

              {/* <li className="nav-item">
              <NavLink className="nav-link" to="/admin/filled">
                FILLED
              </NavLink>
            </li> */}
            </div>
          </ul>
        ) : null}

        <div>
          {props.user && (
            <ul>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/applicants/${props.user.user_id}`}
                >
                  Profile ({props.user.email})
                </NavLink>
              </li>
              <li className="nav-item">
                {/* Log out user. Then go to home page. */}
                <NavLink className="nav-link" to="/" onClick={props.logoutCb}>
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* {!isAdmin ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/applied">
              APPLIED
            </NavLink>
          </li>
        ) : null} */}
      </ul>
    </nav>
  );
}

export default Navbar;
