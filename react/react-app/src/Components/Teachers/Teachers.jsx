import React, { useState } from 'react';
import './Teachers.css';
import { FaUser, FaLock, FaMobileAlt, FaAddressCard } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { Link } from 'react-router-dom';


function Teachers() {
  const [name, setTeachername] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      name,
      mobile,
      address,
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:8080/teachers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage('✅ Register successful!');
      } else {
        setMessage('❌ ' + result);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="wrapper2">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-box">
            <PiStudentFill  className="icon" />
            <input
              type="text"
              placeholder="Teacher Name"
              required
              onChange={e => setTeachername(e.target.value)}
            />
          </div>

          <div className="input-box">
            < FaMobileAlt className="icon" />
            <input
              type="tel"
              placeholder="Mobile"
              required
              onChange={e => setMobile(e.target.value)}
            />
          </div>

        <div className="input-box">
          <FaAddressCard className="icon" />
          <input
             type="text"
             placeholder="Address"
             required
             onChange={e => setAddress(e.target.value)}
          />
        </div>

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
          <p>{message}</p>
         
        </form>
      </div>
    </div>
  );
}

export default Teachers;
