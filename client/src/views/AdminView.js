import React, { useState, useEffect } from "react";

function AdminView(props) {
  const posts = props.posts;
  const applicants = props.applicants;
  const fillPost = props.fillPost;

  const [featPost, setFeatPost] = useState(null);
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    setFeatPost(posts[0]);
  }, [props.posts]);

  if (!featPost) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  function acceptApplicant() {
    fillPost(applicant);
  }

  return (
    <div className="UserHomeView container">
      <div className="pt-4"></div>
      <h2>My posts</h2>

      <div className="row ">
        <div className="col ">
          <h4 className="card-title"> {featPost.company}</h4>
          <h6 className="card-subtitle">{featPost.title} </h6>
          <p className="card-text">{featPost.postdescription}</p>
        </div>
        <div className="col">
          {posts.map((post) =>
            post.filled === 0
              ? applicants.map((applicant) => (
                  <div key={applicant.applicant_id}>
                    <h5 className="card-title"> {applicant.applicantname}</h5>
                    <h6 className="card-subtitle">{applicant.email} </h6>
                    <p className="card-text">{applicant.cv}</p>
                    <button
                      onClick={() => setApplicant(applicant) && acceptApplicant}
                      className="btn"
                    >
                      Accept
                    </button>
                    <hr />
                  </div>
                ))
              : null
          )}
        </div>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div
            className="card col-md-3 p-4"
            key={post.post_id}
            onClick={() => setFeatPost(post)}
          >
            <h4 className="card-title"> {post.company}</h4>
            <h6 className="card-subtitle">{post.title} </h6>
            <p className="card-text">{post.postdescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminView;
