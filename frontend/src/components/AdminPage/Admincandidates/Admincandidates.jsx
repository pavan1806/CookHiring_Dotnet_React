import React, { useEffect, useState } from 'react';
import './Admincandidates.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Admincandidates() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5131/api/Admin/getprofile')
      .then(res => {
        if (res.data.Status === 'Success') {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  }, []);

  // Get the current system date
  const currentDate = new Date().toLocaleDateString();

  const handleDelete = id => {
    axios
      .delete(`http://localhost:5131/api/Admin/deleteprofile/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  };

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
                  <Link to="/admin/getAllJobs" className="nav-link active" id='AdminOpenings'>Openings</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/profile" className="nav-link" id='AdminCandidates' aria-current="page">Candidates</Link>
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
        {data.length > 0 ? (
          data.map((val) => {
            return (
              <div className="template" key={val.id} id="adminCandidateGrid">
                <div className="leftContainer">
                  <p>Name of Candidate  : {val.personName}</p>
                  <p>Phone Number  : {val.personPhone}</p>
                  <p>Year of Experience : {val.personExp}</p>
                </div>
                <div className="rightContainer">
                  <p>Address : {val.personAddress}</p>
                  <p>Email id : {val.personEmail}</p>
                </div>
                <div className="buttonContainer">
                  
                  <Link to={`/admin/profile/editProfile/${val.id}`} id="adminEditOpenings" className="editButton" type="button">
                    <FaEdit />
                  </Link>
                  <Link onClick={e => handleDelete(val.id)} id="deleteCandidate" className="deleteButton" type="button">
                    <FaTrash />
                  </Link>
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

export default Admincandidates;