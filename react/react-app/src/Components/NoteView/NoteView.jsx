import React, { useState, useEffect } from 'react';
import './NoteView.css';

function NoteView() {
  const [notes, setNotes] = useState([]);

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

  return (
    <div className="wrapper-view">
      <div className="form-box login">
        <div>
          <h3>📜 Uploaded Files</h3>
          <br />
          <br />
          <ul className="list">
            {notes.map((note) => (
              <li key={note.id} className="listItem">
                
              <strong>{note.title}</strong> {/* Display title here */}
                <br></br>
                <br></br>
                {note.fileName} ({note.fileType})
                <a
                  href={`http://localhost:8080/notes/download/${note.id}`}
                  className="link"
                  download
                >
                  ⬇️ Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NoteView;
