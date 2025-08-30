import React, { useState, useEffect } from 'react';
import './HomeworkView.css';

function HomeworkView() {
  const [studentName, setStudentName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [homeworks, setHomeworks] = useState([]);

  // Fetch all homeworks
  const fetchHomeworks = async () => {
    try {
      const res = await fetch('http://localhost:8080/homework/all');
      if (!res.ok) {
        throw new Error('Failed to fetch homework list');
      }
      const data = await res.json();
      if (data.length === 0) {
        setMessage('❌ No homework titles available.');
      } else {
        setHomeworks(data);
      }
    } catch (err) {
      console.error('Error fetching homeworks:', err);
      setMessage('❌ Failed to load homework list.');
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  // Submit handler
  const handleSubmit = async (homeworkTitle) => {
    if (!studentName || !file) {
      setMessage('⚠️ Please enter your name and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('homeworkTitle', homeworkTitle);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8080/homework_submit/submit', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage(`✅ Submitted for "${homeworkTitle}" successfully!`);
        setFile(null);
        document.getElementById('fileInput').value = ''; // Reset the file input
      } else {
        setMessage('❌ Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting homework:', err);
      setMessage('❌ Error submitting homework.');
    }
  };

  return (
    <div className="wrapper-view">
      <div className="form-box homework">
        <h3>📚 Submit Homework</h3>

        {/* Input Fields */}
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Select File:</label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Homework List */}
        <h4>📄 Available Homework</h4>
        <div className="homework-list">
          {homeworks.length === 0 && <p>No homework available at the moment.</p>}
{homeworks.map((hw) => (
  <div className="homework-card" key={hw.id}>
    <div className="homework-title">
      📚 <strong>{hw.title}</strong> {/* Display the homework title */}
    </div>
    <div className="homework-info">
      {hw.fileName} <span className="file-type">({hw.fileType})</span>
    </div>
    <div className="homework-actions">
      <a
        href={`http://localhost:8080/homework/download/${hw.id}`}
        className="download-link"
        download
      >
        ⬇️ Download
      </a>
      <button
        className="submit-btn"
        onClick={() => handleSubmit(hw.homeworkTitle)}
      >
        📤 Submit
      </button>
    </div>
  </div>
          ))}
        </div>

        {/* Message */}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default HomeworkView;
