package edu.icet.com.controller;

import edu.icet.com.entities.AttendenceItemEntity;
import edu.icet.com.service.AttendenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/attendence")
public class AttendenceController {
    @Autowired
    AttendenceService as;




    @PostMapping("/add")
    public Boolean save(@RequestBody List<AttendenceItemEntity> attendanceList) {

            return as.submitAttendence(attendanceList);

    }


    @GetMapping("/absent")
    public List<AttendenceItemEntity> getAll() {

        return as.getAbsentParents();
    }

    @GetMapping("/by-date/{date}")
    public List<AttendenceItemEntity> getByDate(@PathVariable String date) {
        return as.getByDate(date);
    }
}