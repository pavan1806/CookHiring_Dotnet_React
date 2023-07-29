import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function Jobseekerapplyjob() {
  // State to manage person details
  const [values, setValues] = useState({
    jobDescription: '',
    jobLocation: '',
    fromDate: '',
    toDate: '',
    wagePerDay: '',
    jobPhone: '',
    personName: '',
    personAddress: '',
    personExp: '',
    personPhone: '',
    personEmail: '',
    stat: 'applied',
  });

  // Get the selected job details from the previous page using useLocation
  const location = useLocation();
  const selectedJob = location.state?.job;

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle input changes
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedFromDate = new Date(selectedJob.fromDate).toISOString();
    const formattedToDate = new Date(selectedJob.toDate).toISOString();

    // Send a POST request to the server to apply for the job
    axios
      .post('http://localhost:5131/api/Admin/applyjob', {
        ...values,
        jobDescription: selectedJob.jobDescription,
        jobLocation: selectedJob.jobLocation,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
        wagePerDay: selectedJob.wagePerDay,
        jobPhone: selectedJob.jobPhone,
      })
      .then((res) => {
        // After successful submission, navigate to the dashboard
        navigate('/jobseeker/appliedjob');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='body'>
      <div>
        <br />
      </div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="navbar-brand" id='home'>Cooking Expert</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/user/dashboard" className="nav-link active" id='userHomeButton'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/jobseeker/appliedjob" className="nav-link" id='userAppliedJobs' aria-current="page">Applied Jobs</Link>
                </li>
              </ul>
              <Link to="/user/login">
                <a className="logout" id='logout'>Logout</a>
              </Link>
            </div>
          </div>
        </nav>
      {/* Application Form */}
      <div className='d-flex justify-content-center align-items-center vh-100 addpage'>
        <div className='p-1 rounded w-25 border addform'>
          <h2>Apply Job Openings</h2>
          <form onSubmit={handleSubmit}>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='jobId'
                name='jobId'
                value={selectedJob.jobId}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='jobDescription'
                name='jobDescription'
                value={selectedJob.jobDescription}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='fromDate'
                name='fromDate'
                value={selectedJob.fromDate}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='toDate'
                name='toDate'
                value={selectedJob.toDate}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='jobLocation'
                name='jobLocation'
                value={selectedJob.jobLocation}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='wagePerDay'
                name='wagePerDay'
                value={selectedJob.wagePerDay}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='hidden'
                className='form-control'
                id='jobPhone'
                name='jobPhone'
                value={selectedJob.jobPhone}
                autoComplete='off'
                onChange={handleInput}
              />
            </div>


            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterName'
                name='personName'
                placeholder='Enter the person name'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterAddress'
                name='personAddress'
                placeholder='Enter the person address'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterYearOfExperience'
                name='personExp'
                placeholder='Enter the person experience'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterPhoneNumber'
                name='personPhone'
                placeholder='Enter the person Phone Number'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterEmail'
                name='personEmail'
                placeholder='Enter the person Email'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>

            <div className='mb-3'>
              <button type='submit' className='btn btn-success'>
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Jobseekerapplyjob;