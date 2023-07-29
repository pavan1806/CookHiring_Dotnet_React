import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom';

function EditOpening() {
  const [formValues, setFormValues] = useState({
    jobId: '',
    jobDescription: '',
    jobLocation: '',
    fromDate: '',
    toDate: '',
    wagePerDay: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5131/api/Job/getjob/${id}`)
      .then(res => {
        const job = res.data;

        if (job) {
          const {
            jobId,
            jobDescription,
            jobLocation,
            fromDate,
            toDate,
            wagePerDay
          } = job;

          setFormValues({
            jobId,
            jobDescription,
            jobLocation,
            fromDate,
            toDate,
            wagePerDay
          });
        } else {
          console.log('Job not found');
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInput = event => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5131/api/Job/updatejob/${id}`, formValues)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/admin/getAllJobs');
        } else {
          console.log('Update failed');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="body">
      <div>
        <br />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand" id="home">
            Cooking Expert
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  to="/admin/getAllJobs"
                  className="nav-link active"
                  id="AdminOpenings"
                >
                  Openings
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/profile"
                  className="nav-link"
                  id="AdminCandidates"
                  aria-current="page"
                >
                  Candidates
                </Link>
              </li>
            </ul>
            <Link to="/login">
              <a className="logout" id="logout">
                Logout
              </a>
            </Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={formValues.jobDescription}
                className="form-control"
                id="editJobDescription"
                name="jobDescription"
                placeholder="Enter the Job Description"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={formValues.jobLocation}
                className="form-control"
                id="editJobLocation"
                name="jobLocation"
                placeholder="Enter the Job Location"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                value={formValues.fromDate}
                className="form-control"
                id="editFromDate"
                name="fromDate"
                placeholder="Enter the From Date"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                value={formValues.toDate}
                className="form-control"
                id="editToDate"
                name="toDate"
                placeholder="Enter the To Date"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={formValues.wagePerDay}
                className="form-control"
                id="editWagePerDay"
                name="wagePerDay"
                placeholder="Enter the Wage for day"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={formValues.jobPhone}
                className="form-control"
                id="editPhoneNumber"
                name="jobPhone"
                placeholder="Enter the Phone Number"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <button
                type="submit"
                id="updateButton"
                className="btn btn-success w-10"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOpening;
