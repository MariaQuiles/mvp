import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";

function UserApplied(props) {
  const applicants = props.applicants;
  const user = props.user;
  const postApplicants = props.postApplicants;
  const emptyForm = { email: "" };
  const [formData, setFormData] = useState(emptyForm);
  const [errorMsg, setErrorMsg] = useState("");
  let { id } = useParams();

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

  useEffect(() => {
    // fetchProfile();
  }, []);

  // async function fetchProfile() {
  //   let myresponse = await Api.getApplicant(id);
  //   if (myresponse.ok) {
  //     setApplicant(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setApplicant(null);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!props.user) {
    return <h2>Loading...</h2>;
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
        <>
          <h4>Profile Information</h4>
          <div className="UserApplied">
            Username: {user.fullname}
            <br />
            Email: {user.email}
            <br />
            {/* CV: {applicants.cv} */}
          </div>
        </>
      </div>
      {/* {applicants.map((applicant) =>
        applicant.email === formData.email ? (
          postApplicants.map((postApplicant) =>
            postApplicant.ref_applicant_id === applicant.applicant_id ? (
              <div></div>
            ) : null
          )
        ) : ( */}
      {/* )
      )} */}
    </div>
  );
}

export default UserApplied;
