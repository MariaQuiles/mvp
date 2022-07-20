import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Local from "../helpers/Local";

function UserHomeView(props) {
  const posts = props.posts;
  let user = Local.getUser();

  const [featPost, setFeatPost] = useState(null);
  const [postID, setpostID] = useState();

  useEffect(() => {
    setFeatPost(posts[0]);
  }, [props.posts]);

  function handleChange(event) {
    let { name, value, id } = event.target;
    console.log(name, value, id);

    setFormData((data) => ({
      ...data,
      [name]: value,
      ["post_id"]: id,
    }));
  }

  const emptyForm = {
    applicantname: user ? user.fullname : "",
    email: user ? user.email : "",
    cv: "",
    post_id: 101,
    // featPost ? featPost.post_id : 0,
    post_id_1: 101,
  };

  const [formData, setFormData] = useState(emptyForm);

  if (!featPost) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    emptyForm.post_id = featPost.post_id;

    props.addApplicant(formData);
    console.log(formData);
    setFormData(emptyForm);

    if (postID) {
      console.log(postID);
    }
  }

  return (
    <div className="UserHomeView container">
      <div className="pt-4"></div> {/*padding top*/}
      {/* <h2>Home</h2> */}
      {!user && (
        <p className="alert alert-danger">
          Please <Link to="/register">register</Link> or
          <Link to="/login"> login</Link> to access the form
        </p>
      )}
      <div className="row ">
        {" "}
        {/*first row*/}
        <div className="col ">
          <h4 className="card-title"> {featPost.company}</h4>
          <h6 className="card-subtitle">{featPost.title} </h6>
          <p className="card-text">{featPost.postdescription}</p>
        </div>
        {user && (
          <form onSubmit={handleSubmit} className="col ">
            <label>Name</label>
            <input
              readOnly
              className="form-control"
              name="applicantname"
              type="text"
              value={formData.applicantname}
              onChange={handleChange}
              id={featPost.post_id}
            />
            <br />
            <label>Email</label>
            <input
              readOnly
              className="form-control"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              id={featPost.post_id}
            />
            <br />
            <label>CV URL</label>
            <input
              className="form-control"
              name="cv"
              type="text"
              value={formData.cv}
              onChange={handleChange}
              id={featPost.post_id}
            />
            <br />
            <div className="text-center">
              {user && (
                <button className="btn btn-primary ">Submit Application</button>
              )}
            </div>
            <br />
          </form>
        )}
      </div>
      <div className="row">
        {" "}
        {/*second row*/}
        {posts.map((post) =>
          !post.filled ? (
            <div className="card col-md-3 p-4" key={post.post_id}>
              {
                /*condition for the button to apply*/
                user && (
                  <button className="btn" onClick={() => setFeatPost(post)}>
                    See more
                  </button>
                )
              }
              <h4 className="card-title"> {post.company}</h4>
              <h6 className="card-subtitle">{post.title} </h6>
              <p className="card-text">{post.postdescription}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default UserHomeView;
