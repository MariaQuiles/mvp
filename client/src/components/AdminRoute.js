import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

function AdminRoute(props) {
  // Redirect to /login if anonymous user
  let user = Local.getUser();
  //   console.log("private route", isadmin);
  if (!user.isadmin) {
    return <Navigate to="/login" />;
  }

  // Render child component(s)
  return <>{props.children}</>;
}

export default AdminRoute;
