import React, { useState } from "react";

function LoginView(props) {
  // set variables we'll use
  const [username, setUsername] = useState(""); // just for the input
  const [password, setPassword] = useState(""); // just for the input

  function handleChange(event) {
    // switch yayyyyy!!!
    let { name, value } = event.target;
    switch (name) {
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
    props.loginCb(username, password);
  }

  return (
    <div className="LoginView container">
      <div className="row">
        <h2>Login</h2>
        {props.loginError && (
          <div className="alert alert-danger">{props.loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
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
export default LoginView;
