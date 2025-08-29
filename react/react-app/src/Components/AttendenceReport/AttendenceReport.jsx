import React, { useState } from "react";
import axios from "axios";
import "./AttendenceReport.css"; 

function AttendenceReport() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    if (!date) {
      setMessage("⚠️ Please select a date!");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/attendence/by-date/${date}`);
      if (res.data.length === 0) {
        setMessage("No attendance records found for this date.");
        setRecords([]);
      } else {
        setRecords(res.data);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error fetching attendance records!");
    }
  };

  return (
    <div className="report-wrapper">
      <h1>Attendance Report</h1>

      {/* Date Input */}
      <div className="date-input">
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleFetch}>Get Records</button>
      </div>

      {/* Message */}
      {message && <p className="message">{message}</p>}

      {/* Results Table */}
      {records.length > 0 && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Username</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.student_name}</td>
                <td>{rec.username}</td>
                <td>{rec.status}</td>
                <td>{rec.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendenceReport;
