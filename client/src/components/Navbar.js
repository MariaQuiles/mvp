import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { doLogout } from "../App";

function Navbar(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChangeView = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

  return (
    <nav className="Navbar navbar navbar-expand-sm navbar-dark mb-4 text-white bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand font-weight-bold">InTurn</span>
        <ul>
          {/* Only show "Register" if nobody is logged in */}
          {!props.user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                {/*make it to the register form*/}
                Register
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              {/*make it to the login form*/}
              Login
            </NavLink>
          </li>
          {props.user && !props.user.isadmin ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                User ({props.user.fullname})
              </NavLink>
            </li>
          ) : null}
          {/* Only show "Admin" if user is logged in */}
          {props.user && props.user.isadmin !== 0 ? (
            <div>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
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
          ) : null}

          <div>
            {props.user && (
              <>
                {!props.user.isadmin && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/applicants/${props.user.user_id}`}
                    >
                      Profile ({props.user.email})
                    </NavLink>
                  </li>
                )}
              </>
            )}
            <li className="nav-item">
              {/* Log out user. Then go to home page. */}
              <NavLink
                className="nav-link"
                to="/login"
                onClick={props.doLogout}
              >
                Logout
              </NavLink>
            </li>
          </div>

          {/* {!isAdmin ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/applied">
              APPLIED
            </NavLink>
          </li>
        ) : null} */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
