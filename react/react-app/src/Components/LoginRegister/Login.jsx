import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json(); // Expecting JSON with "enum" or "role" field

      if (response.ok) {
        setMessage('✅ Login successful!');

        if (result.enum === 1) {
          navigate('/adminDashboard');
        } else if (result.enum === 2) {
          navigate('/parentsDashboard');
        } else if(result===3){
          navigate('/teacherDashboard');
        }else {
          setMessage('❌ Unknown role.');
        }
      } else {
        setMessage('❌ ' + (result.message || 'Login failed.'));
      }

    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="wrapper_login">
      <div className="form-box ">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

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

          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          {/* Submit button without Link */}
          <button type="submit">Login</button>
          <p>{message}</p>

          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
