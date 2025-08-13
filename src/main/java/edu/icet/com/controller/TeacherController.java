package edu.icet.com.controller;

import edu.icet.com.entities.ParentEntity;
import edu.icet.com.entities.TeacherEntity;
import edu.icet.com.service.ParentService;
import edu.icet.com.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teachers")
@CrossOrigin
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/add")
    public void save(@RequestBody TeacherEntity t1){
        teacherService.addTeachers(t1);
    }
}
