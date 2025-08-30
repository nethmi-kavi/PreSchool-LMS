import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendence.css';

function Attendence() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students/all")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const getAbsentAttendance = () => {
    axios.get("http://localhost:8080/attendence/absent") 
      .then(res => setAbsentStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleAttendance = (id, present) => {
    setAttendance(prev => ({ ...prev, [id]: present }));
  };

  const today = new Date().toISOString().split('T')[0];

  const submitAttendance = () => {
    const attendanceList = students
      .filter(student => attendance[student.id] !== undefined) // Filter out students whose attendance isn't marked
      .map(student => ({
        name: student.name,  // Ensure consistency with backend field names
        username: student.username,          // Ensure consistency with backend field names
        status: attendance[student.id] ? "Present" : "Absent",
        date: today
      }));

    if (attendanceList.length === 0) {
      alert("Please mark attendance before submitting!");
      return;
    }

    axios.post("http://localhost:8080/attendence/add", attendanceList)
      .then(res => alert(res.data?.message || "Attendance saved!"))
      .catch(err => {
        console.error(err);
        alert("Error saving attendance!");
      });
  };

  return (
    <div className="wrapper1">
      <div className="form-box">
        <h1>Student Attendance</h1>
        <h3>Attendance for: {today}</h3>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Present ✅</th>
              <th>Absent ❌</th>
            </tr>
          </thead>
          <tbody>
            {students.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.username}</td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${emp.id}`}
                    onChange={() => handleAttendance(emp.id, true)}
                    checked={attendance[emp.id] === true}
                  /> Present
                </td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${emp.id}`}
                    onChange={() => handleAttendance(emp.id, false)}
                    checked={attendance[emp.id] === false}
                  /> Absent
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={submitAttendance}>Submit Attendance</button>
        <button style={{ marginTop: "10px" }} onClick={getAbsentAttendance}>
          Get Absent Students
        </button>

        {absentStudents.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Absent Students Today</h3>
            <ul>
              {absentStudents.map(s => (
                <li key={s.id}>{s.name} ({s.username})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendence;