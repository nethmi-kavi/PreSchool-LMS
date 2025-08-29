import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentsReport.css";

function StudentsReport() {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch students on component mount
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/students/all");

      if (!res.data || res.data.length === 0) {
        setMessage("❌ Students not found.");
        setRecords([]);
      } else {
        setRecords(res.data);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error fetching student records!");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-wrapper">
      <h1>Students Report</h1>

      {/* Loading */}
      {loading && <p>Loading students...</p>}

      {/* Message */}
      {message && <p className="message">{message}</p>}

      {/* Results Table */}
      {records.length > 0 && !loading && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Birthday</th>
              <th>Parent</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.name}</td>
                <td>
                  {rec.birthday
                    ? new Date(rec.birthday).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{rec.parent?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Optional: Button to manually refresh */}
      <button onClick={handleFetch} className="refresh-button">
        Refresh
      </button>
    </div>
  );
}

export default StudentsReport;
