import React, { useState, useEffect } from "react";

function AdminView(props) {
  const posts = props.posts;
  const applicants = props.applicants;
  const fillPost = props.fillPost;
  const fillPostApplicant = props.fillPostApplicant;
  const postApplicants = props.postApplicants;
  const getPostsWithApplicants = props.getPostsWithApplicants;

  const [featPost, setFeatPost] = useState(null);

  useEffect(() => {
    setFeatPost(posts[0]);
  }, [props.posts]);

  if (!featPost || !postApplicants || !posts) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  function handleCLick(featPost, applicant) {
    fillPost(featPost);
    fillPostApplicant(featPost, applicant);
  }

  function handleCardClick(post) {
    setFeatPost(post);
    getPostsWithApplicants(post.post_id ? post.post_id : 1);
  }

  return (
    <div className="AdminView container">
      <div className="pt-4"></div>
      <h2>My posts</h2>

      <div className="row ">
        <div className="col ">
          <h4 className="card-title"> {featPost.company}</h4>
          <h6 className="card-subtitle">{featPost.title} </h6>
          <p className="card-text">{featPost.postdescription}</p>
        </div>

        <div className="col">
          {featPost.filled === 0 && postApplicants.applicants ? (
            postApplicants.applicants.map((applicant) => (
              <div key={applicant.applicant_id}>
                <h5>{applicant.applicantname}</h5>
                <h6>{applicant.email} </h6>
                <p>{applicant.cv}</p>
                <button
                  onClick={() => handleCLick(featPost, applicant)}
                  className="btn"
                >
                  Accept
                </button>
                <hr />
              </div>
            ))
          ) : (
            <h4>This position has been filled</h4>
          )}
        </div>
      </div>
      <br />
      <div className="row">
        {posts.map((post) => (
          <div
            className="card col-md-3 p-4"
            key={post.post_id}
            onClick={() => handleCardClick(post)}
          >
            <h4 className="card-title"> {post.company}</h4>
            <h6 className="card-subtitle">{post.title} </h6>
            <p className="card-text">{post.postdescription}</p>
          </div>
        ))}
      </div>
      <div className="pb-5"></div>
    </div>
  );
}

export default AdminView;
