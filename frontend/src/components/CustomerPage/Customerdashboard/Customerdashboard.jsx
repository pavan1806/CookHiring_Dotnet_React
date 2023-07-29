import React, { useEffect, useState } from 'react';
import './Customerdashboard.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function Customerdashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:5131/api/Job/getjob')
      .then(res => {
        if (res.data.Status === 'Success') {
          console.log(res.data.Result);
          setData(res.data.Result);
          setOriginalData(res.data.Result); // Store the original data for filtering
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = originalData.filter((item) =>
      item.jobLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  // Get the current system date
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
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
        <div></div>
      </div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search Job"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
          <button
            className="btn btn-success w-10"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {(filteredData.length > 0 ? filteredData : data).map((val) => {
          return (
            <div className="template" key={val.jobId} id="adminCandidateGrid">
              <div className="leftContainer">
                <p>Job Description  : {val.jobDescription}</p>
                <p>From Date       : {new Date(val.fromDate).toLocaleDateString('en-GB')}</p>
                <p>Job Location : {val.jobLocation}</p>
              </div>
              <div className="rightContainer">
                <p>Wage Per Day : {val.wagePerDay}</p>
                <p>To Date : {new Date(val.toDate).toLocaleDateString('en-GB')}</p>
                <p>Phone Number : {val.jobPhone}</p>
              </div>
              <div className="buttonContainer">
                <button className={new Date(currentDate) <= new Date(val.toDate) ? 'available-button' : 'unavailable-button'}>
                  {new Date(currentDate) <= new Date(val.toDate) ? 'Available' : 'Not Available'}
                </button>
              </div>
            </div>
          );
        })}
        {filteredData.length === 0 && data.length === 0 && <p>No results found.</p>}
      </div>
    </>
  );
}

export default Customerdashboard;
