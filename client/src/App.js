import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
// import ErrorView from './views/ErrorView'; this is needed
import UserHomeView from "./views/UserHomeView";
import AdminView from "./views/AdminView";
import AdminPost from "./views/AdminPost";
// import AdminFilled from "./views/AdminFilled";
import UserApplied from "./views/UserApplied";

function App() {
  let [posts, setposts] = useState([]);
  let [applicants, setApplicants] = useState([]);
  let [postApplicants, setPostApplicants] = useState([]);
  let [user, setUser] = useState(null);
  let [loginErrorMsg, setLoginErrorMsg] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getposts();
  }, []);

  useEffect(() => {
    getApplicants();
  }, []);

  // useEffect(() => {
  //   getPostsWithApplicants();
  // }, []);

  async function doLogin(email, password) {
    let myresponse = await Api.loginUser(email, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  const getposts = async () => {
    let options = {
      method: "GET",
    };

    try {
      let response = await fetch(`/posts`, options);

      if (response.ok) {
        let data = await response.json();
        setposts(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  const getPostsWithApplicants = async (id) => {
    let options = {
      method: "GET",
    };

    try {
      let response = await fetch(`/applicants/${id}`, options);

      if (response.ok) {
        let data = await response.json();
        setPostApplicants(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  const getApplicants = async () => {
    let options = {
      method: "GET",
    };

    try {
      let response = await fetch(`/applicants`, options);

      if (response.ok) {
        let data = await response.json();
        setApplicants(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  async function addPost(newPost) {
    newPost.filled = 0;

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    };

    try {
      let response = await fetch("/posts", options);

      if (response.ok) {
        let data = await response.json();
        setposts(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  async function addApplicant(newApplicant) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplicant),
    };

    try {
      let response = await fetch("/applicants", options);

      if (response.ok) {
        let data = await response.json();
        setApplicants(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  async function fillPost(post) {
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };
    try {
      let response = await fetch(`/posts/${post.post_id}`, options);

      if (response.ok) {
        let data = await response.json();
        setposts(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  async function fillPostApplicant(post, applicant) {
    let tempObject = {
      post_id: post.post_id,
      applicant_id: applicant.applicant_id,
    };
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempObject),
    };
    try {
      let response = await fetch(`/posts_applicants/`, options);

      if (response.ok) {
        let data = await response.json();
        setApplicants(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Navbar user={user} doLogout={doLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />
          <Route
            path="/"
            element={
              <UserHomeView
                user={user}
                posts={posts}
                addApplicant={(newApplicant) => addApplicant(newApplicant)}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminView
                  posts={posts}
                  applicants={applicants}
                  fillPost={fillPost}
                  fillPostApplicant={fillPostApplicant}
                  postApplicants={postApplicants}
                  getPostsWithApplicants={getPostsWithApplicants}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/applicants/:id"
            element={
              <UserApplied
                applicants={applicants}
                postApplicants={postApplicants}
              />
            }
          />
          <Route
            path="/admin/post"
            element={<AdminPost addPost={(newPost) => addPost(newPost)} />}
          />

          {/* <Route path="/admin/filled" element={<AdminFilled />} /> */}
          {/* <Route
          path="/user/applied"
          element={
            <UserApplied
              postApplicants={postApplicants}
              applicants={applicants}
            />
          }
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
