import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function Customeraddjob() {
  const [values, setValues] = useState({
    jobDescription: '',
    jobLocation: '',
    fromDate: '',
    toDate: '',
    wagePerDay: '',
    jobPhone: ''
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5131/api/Job/addjob', values)
      .then((res) => {
        navigate('/customer/dashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div className='body'>
    <div><br/></div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="navbar-brand" id='home'>Cooking Expert</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/customer/dashboard" className="nav-link active" id='customerHomeButton'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer/addJob" className="nav-link" id='addOpenings' aria-current="page">Add Openings</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer/viewAppliedCandidates" className="nav-link" id='appliedCandidates' aria-current="page">Applied Candidates</Link>
                </li>
              </ul>
              <Link to="/user/login">
                <a className="logout" id='logout'>Logout</a>
              </Link>
            </div>
          </div>
          <Outlet />
        </nav>
      <div className='d-flex justify-content-center align-items-center vh-100 addpage'>
        <div className='p-1 rounded w-25 border addform'>
          <h2>Add Job Openings</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterJobDescription'
                name='jobDescription'
                placeholder='Enter the Job Description'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterJobLocation'
                name='jobLocation'
                placeholder='Enter the Job Location'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='date'
                className='form-control'
                id='enterFromDate'
                name='fromDate'
                placeholder='Enter the From Date'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='date'
                className='form-control'
                id='enterToDate'
                name='toDate'
                placeholder='Enter the To Date'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterWageForDay'
                name='wagePerDay'
                placeholder='Enter the Wage per Day'
                autoComplete='off'
                onChange={handleInput}
              />
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='enterPhoneNumber'
                name='jobPhone'
                placeholder='Enter the Phone Number'
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

export default Customeraddjob;
