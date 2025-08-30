package edu.icet.com.controller;

import edu.icet.com.entities.HomeworkEntity;
import edu.icet.com.entities.NoteEntity;
import edu.icet.com.service.HomeworkService;
import edu.icet.com.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/homework")
public class HomeworkController {
    @Autowired
    private HomeworkService noteService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadNote(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title) {
        try {
            noteService.saveFile(file, title);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file");
        }
    }


    @GetMapping("/all")
    public List<HomeworkEntity> getAllFiles() {
        return noteService.getAllFiles();
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        return noteService.downloadFile(id);
    }

    @CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE})
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        noteService.deleteFile(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
