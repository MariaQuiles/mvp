import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterView(props) {
  // set variables we'll use
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    // switch yayyyyy!!!
    let { name, value } = event.target;
    switch (name) {
      case "fullnameInput":
        setFullname(value);
        break; // stops condition
      case "usernameInput":
        setUsername(value);
        break; // stops condition
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    // make a form in the return
    event.preventDefault();
    props.registerCb(fullname, username, password);
    setFullname("");
    setUsername("");
    setPassword("");
  }

  return (
    <div className="RegisterView container">
      <div className="row">
        <h2>Sign in</h2>
        {props.registerError && (
          <div className="alert alert-success">
            {props.registerError} | Go to <Link to="/login">Login</Link>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Fullname
              <input
                type="text"
                name="fullnameInput"
                required
                className="form-control"
                value={fullname}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Email
              <input
                type="text"
                name="usernameInput"
                required
                className="form-control"
                value={username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Password
              <input
                type="password"
                name="passwordInput"
                required
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterView;
