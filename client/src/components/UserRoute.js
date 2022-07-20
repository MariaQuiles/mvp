import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

function UserRoute(props) {
  // Redirect to /login if anonymous user
  let admin = Local.getUser();
  //   console.log("private route", isadmin);
  if (admin.isadmin === 1) {
    return <Navigate to="/login" />;
  }

  // Render child component(s)
  return <>{props.children}</>;
}

export default UserRoute;
