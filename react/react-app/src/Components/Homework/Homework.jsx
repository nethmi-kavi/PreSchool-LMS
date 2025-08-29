import React, { useState, useEffect } from "react";
import "./Homework.css";

function Homework() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const fetchHomeworks = async () => {
    try {
      const res = await fetch("http://localhost:8080/homework/all");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching homeworks:", err);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("⚠️ Please select a file first!");
      return;
    }

    if (!title.trim()) {
      setMessage("⚠️ Please enter a title!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:8080/homework/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ File uploaded successfully!");
        setFile(null);
        setTitle("");
        fetchHomeworks();
      } else {
        setMessage("❌ Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Server error during upload.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/homework/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("🗑️ File deleted successfully.");
        fetchHomeworks();
      } else {
        setMessage("❌ Failed to delete file.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Server error during delete.");
    }
  };

  // Group notes by homework title
  const groupedNotes = notes.reduce((groups, note) => {
    const groupTitle = note.homeworkTitle || "Untitled";
    if (!groups[groupTitle]) {
      groups[groupTitle] = [];
    }
    groups[groupTitle].push(note);
    return groups;
  }, {});

  return (
    <div className="wrapper6">
      <div className="form-box login">
        <div className="notes-container">
          <h2>📂 Upload Homework</h2>

          {/* Upload Form */}
          <form onSubmit={handleUpload} className="form">
            <input
              type="text"
              placeholder="Homework Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="input"
              required
            />
            <button type="submit" className="button">
              Upload
            </button>
          </form>

          {/* Feedback message */}
          {message && <p className="message">{message}</p>}

          <h3>📜 Uploaded Homework</h3>
          {Object.keys(groupedNotes).length === 0 ? (
            <p>No homework uploaded yet.</p>
          ) : (
            Object.entries(groupedNotes).map(([title, notes]) => (
              <div key={title} className="homework-group">
                <h4>{title}</h4>
                <ul>
                  {notes.map((note) => (
                    <li key={note.id} className="note-item">
                      <div className="note-info">
                        <span className="note-icon">📄</span>
                        <div className="note-details">
                          <div className="note-title">{note.title}</div>
                          <div className="note-filename">{note.fileName}</div>
                          <div className="note-filetype">{note.fileType}</div>
                        </div>
                      </div>
                      <div className="note-actions">
                        <a
                          href={`http://localhost:8080/homework/download/${note.id}`}
                          className="link"
                          download
                        >
                          ⬇️ Download
                        </a>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="deleteBtn"
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Homework;
