import React, { useState, useEffect } from 'react';
import '../Components/Register.css';
import { FaUser, FaLock } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";      
import { FaMobileAlt } from "react-icons/fa"; 
import { Link } from 'react-router-dom';

function Register() {
  const [student_name, setStudentname] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/students/names')
      .then(res => res.json())
      .then(data => setStudentList(data))
      .catch(err => console.error("Error fetching student names:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if student name exists in DB (case insensitive)
    if (!studentList.map(name => name.toLowerCase()).includes(student_name.toLowerCase())) {
      setMessage('❌ Student name not found in database. Please contact admin.');
      return;
    }

    const loginData = { student_name, mobile, username, password };

    try {
      const response = await fetch('http://localhost:8080/parents/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage('✅ Register successful!');
        // Reset form
        setStudentname('');
        setMobile('');
        setUsername('');
        setPassword('');
      } else {
        setMessage('❌ ' + result);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="wrapper-register">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-box">
            <PiStudentFill className="icon" />
            <input
              type="text"
              placeholder="Student Name"
              required
              value={student_name}
              onChange={e => setStudentname(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaMobileAlt className="icon" />
            <input
              type="tel"
              placeholder="Mobile"
              required
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
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

export default Register;
