import React, { useState, useEffect } from 'react';
import './Students.css';
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaMobileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Students() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [parent, setParent] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const newStudent = {
      name,
      birthday,
      parent,
      username    };

    try {
      const response = await fetch('http://localhost:8080/students/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        setMessage('✅ Register successful!');
        setName('');
        setBirthday('');
        setParent('');
      } else {
        const result = await response.text();
        setMessage('❌ ' + result);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-box">
            <PiStudentFill className="icon" />
            <input
              type="text"
              placeholder="Student Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaBirthdayCake className="icon" />
            <input
              type="date"
              placeholder="Birthday"
              required
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Parent Name"
              required
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            />
          </div>

           <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
          <p>{message}</p>

          <div className="register-link">
            <p>Already have an account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Students;
