import React, { useState } from "react";
import axios from "axios";
import "./AttendenceReport.css";

function AttendenceReport() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!date) {
      setMessage("⚠️ Please select a date!");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get(`http://localhost:8080/attendence/by-date/${date}`);
      if (res.data.length === 0) {
        setMessage("No attendance records found for this date.");
        setRecords([]);
      } else {
        setRecords(res.data);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error fetching attendance records!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-wrapper">
      <h1>Attendance Report</h1>

      <div className="date-input">
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleFetch}>Get Records</button>
      </div>

      {message && <p className="message">{message}</p>}
      {loading && <p>Loading attendance data...</p>}

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
                <td>{rec.name}</td>
                <td>{rec.username}</td>
                <td style={{ color: rec.status === "Present" ? "green" : "red" }}>
                  {rec.status}
                </td>
                <td>{new Date(rec.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendenceReport;
