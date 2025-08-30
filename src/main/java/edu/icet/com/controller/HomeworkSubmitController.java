package edu.icet.com.controller;

import edu.icet.com.entities.HomeworkSubmitEntity;
import edu.icet.com.service.HomeworkSubmitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("homework_submit")
public class HomeworkSubmitController {
    @Autowired
    private HomeworkSubmitService homeworkService;

    // Endpoint to handle homework submission
    @PostMapping("/submit")
    public ResponseEntity<String> submitHomework(
            @RequestParam("studentName") String studentName,
            @RequestParam("homeworkTitle") String homeworkTitle,
            @RequestParam("file") MultipartFile file) {

        try {
            HomeworkSubmitEntity submittedHomework = homeworkService.submitHomework(studentName, homeworkTitle, file);
            return ResponseEntity.ok("Homework submitted successfully: " + submittedHomework.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit homework");
        }
    }
}
