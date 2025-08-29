import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/LoginRegister/Login';
import Register from './Components/Register';
import Attendence from './Components/Attendence/Attendence';
import Teachers from './Components/Teachers/Teachers';
import NoteView from './Components/NoteView/NoteView';
import Homepage from './Components/Homepage/Homepage';
import Teacher_Dashboard from './Components/Teacher_Dashboard/Teacher_Dashboard';
import Notes from "./Components/Notes/Notes";
import Homework from './Components/Homework/Homework';
import Students from './Components/Students/Students';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ParentsDashboard from './Components/ParentsDashboard/ParentsDashboard';
import AttendenceReport from './Components/AttendenceReport/AttendenceReport';
import StudentseReport from './Components/StudentsReport/StudentsReport';
import HomeworkView from './Components/HomeworkView/HomeworkView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/teachers" element={<Teachers/>} />
        <Route path="/noteView" element={<NoteView/>} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/teacherDashboard" element={<Teacher_Dashboard/>}/>
        <Route path="/" element={<Homepage/>} />
        <Route path="/homework" element={<Homework/>} />
        <Route path="/students" element={<Students/>} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
        <Route path="/parentsDashboard" element={<ParentsDashboard/>} />
        <Route path="/attendenceReport" element={<AttendenceReport/>} />
        <Route path="/studentsReport" element={<StudentseReport/>} />  
        <Route path="/homeworkView" element={<HomeworkView/>} />       
      </Routes>
    </Router>
  );
}

export default App;