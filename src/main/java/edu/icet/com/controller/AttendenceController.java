package edu.icet.com.controller;

import edu.icet.com.dto.AttendenceDTO;
import edu.icet.com.dto.AttendenceItem;
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


    @PostMapping
    public void save(@RequestBody AttendenceDTO a1) {
        as.submitAttendence(a1);
    }


    @GetMapping("/")
    public List<AttendenceItem> getAll() {

        return as.getAbsentParents();
    }
}