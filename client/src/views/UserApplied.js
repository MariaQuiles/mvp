import React, { useState, useEffect } from "react";

function UserApplied(props) {
  const applicants = props.applicants;
  const postApplicants = props.postApplicants;

  const emptyForm = { email: "email@email.com" };

  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    let { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="pt-5 row">
          <label>Email address</label>
          <div className="col-11">
            <input
              className="form-control"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary col-md-auto">SUBMIT</button>
        </div>
      </form>
      <div className="pt-3">
        <h4>You have applied to:</h4>
      </div>

      {applicants.map((applicant) =>
        applicant.email === formData.email ? (
          // postApplicants.map((postApplicant) =>
          //   postApplicant.ref_applicant_id === applicant.applicant_id ? (
          //     <div></div>
          //   ) : null
          // )
          <div></div>
        ) : (
          <div></div>
        )
      )}
    </div>
  );
}

export default UserApplied;
