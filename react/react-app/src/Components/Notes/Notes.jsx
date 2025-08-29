import React, { useState, useEffect } from "react";
import './Notes.css';

function Notes() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(""); // <-- added title state
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/notes/all");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Upload handler
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
    formData.append("title", title); // <-- send title to backend

    try {
      const res = await fetch("http://localhost:8080/notes/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ File uploaded successfully!");
        setFile(null);
        setTitle(""); // <-- reset title
        fetchNotes();
      } else {
        setMessage("❌ Upload failed!");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading file");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/notes/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("🗑️ File deleted");
        fetchNotes();
      } else {
        setMessage("❌ Delete failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting file");
    }
  };

  return (
    <div className="notes-wrapper">
      <div className="notes-container">
        <div className="notes-header">
          <h2 className="notes-title">📂 Notes Upload</h2>
        </div>
        
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />

          <div className="file-input-container">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-input-label">
              Choose File
            </label>
            {file && <span className="file-name">{file.name}</span>}
          </div>

          <button type="submit" className="upload-button">
            Upload File
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : 'warning'}`}>
            {message}
          </div>
        )}

        <div className="notes-section">
          <h3 className="section-title">📜 Uploaded Files</h3>
          <div className="notes-list">
            {notes.length === 0 ? (
              <div className="empty-state">
                <p>No files uploaded yet</p>
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-info">
                    <span className="note-icon">📄</span>
                    <div className="note-details">
                      <div className="note-title">{note.title}</div> {/* show title */}
                      <div className="note-filename">{note.fileName}</div>
                      <div className="note-filetype">{note.fileType}</div>
                    </div>
                  </div>
                  <div className="note-actions">
                    <a
                      href={`http://localhost:8080/notes/download/${note.id}`}
                      className="download-link"
                      download
                    >
                      ⬇️ Download
                    </a>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="delete-button"
                      title="Delete file"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
