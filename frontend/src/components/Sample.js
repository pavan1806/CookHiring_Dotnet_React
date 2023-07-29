import React, { useEffect, useState } from 'react';
import './Customerviewappliedjobs.css';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function Customerviewappliedjobs() {
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:5131/api/User/getappliedcandidates')
      .then(res => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  };

  const handleStatusChange = (id, currentStatus) => {
    let newStatus;
    let buttonText;
    let buttonColor;
  
    if (currentStatus === 'yes') {
      newStatus = 'no';
      buttonText = 'Rejected';
      buttonColor = 'red';
    } else if (currentStatus === 'no') {
      newStatus = 'yes';
      buttonText = 'Accepted';
      buttonColor = '#39C64D';
    } else {
      newStatus = 'yes';
      buttonText = 'Applied';
      buttonColor = 'green';
    }
  
   

  return (
    <>
      <div className='body'>
        <div><br /></div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="navbar-brand" id='home'>Cooking Expert</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/customer/dashboard" className="nav-link active" id='CustomerHomeButton'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer/addJob" className="nav-link" id='addOpenings' aria-current="page">Add Openings</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer/viewAppliedCandidates" className="nav-link" id='viewAppliedCandidates' aria-current="page">Applied Candidates</Link>
                </li>
              </ul>
              <Link to="/login">
                <a className="logout" id='logout'>Logout</a>
              </Link>
            </div>
          </div>
          <Outlet />
        </nav>
        <div></div>
      </div>
      <div className="templateContainer">
        {data.length > 0 ? (
          data.map((val) => {
            const currentStatus = val.stat;
            const isAccepted = currentStatus === 'yes';
            const buttonText = isAccepted ? 'Accepted' : currentStatus === 'no' ? 'Rejected' : 'Applied';
            const buttonColor = isAccepted ? '#39C64D' : currentStatus === 'no' ? 'red' : 'green';

            return (
              <div className="template" key={val.id} id="adminCandidateGrid">
                <div className="leftContainer">
                  <p>Name of Candidate: {val.personName}</p>
                  <p>Phone Number: {val.personPhone}</p>
                  <p>Year of Experience: {val.personExp}</p>
                </div>
                <div className="rightContainer">
                  <p>Address: {val.personAddress}</p>
                  <p>Email id: {val.personEmail}</p>
                </div>
                <div className="buttonContainer">
                  <button
                    style={{ backgroundColor: buttonColor }}
                    onClick={() => handleStatusChange(val.id, currentStatus)}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}

export default Customerviewappliedjobs;
