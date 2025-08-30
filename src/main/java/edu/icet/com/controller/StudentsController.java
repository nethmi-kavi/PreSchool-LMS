package edu.icet.com.controller;


import edu.icet.com.entities.StudentsEntity;
import edu.icet.com.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class StudentsController {
    @Autowired
    private StudentsService service;

    @PostMapping("/add")
    public void saveStudents(@RequestBody StudentsEntity student){
        service.addStudent(student);
    }

    @GetMapping("/names")
    public List<String> getAllStudentNames() {
        return service.getAllStudentsname();
    }
    @GetMapping("/all")
    public List<StudentsEntity> getAllStudents(){
        return service.getAllStudents();
    }
}
