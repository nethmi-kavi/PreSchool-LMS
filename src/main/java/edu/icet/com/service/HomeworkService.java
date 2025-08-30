package edu.icet.com.service;

import edu.icet.com.entities.HomeworkEntity;
import edu.icet.com.repository.HomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class HomeworkService {

    @Autowired
    private HomeworkRepository homeworkRepository;

    // Directory to store files, if required for file system storage
    private final String uploadDir = "uploads/";

    public HomeworkEntity saveFile(MultipartFile file, String title) throws IOException {
        HomeworkEntity homework = HomeworkEntity.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .title(title)
                .data(file.getBytes())  // Store file as byte array in the database
                .build();
        return homeworkRepository.save(homework);
    }

    public void deleteFile(Long id) {
        if (homeworkRepository.existsById(id)) {
            homeworkRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Homework with ID " + id + " not found");
        }
    }

    public List<HomeworkEntity> getAllFiles() {
        return homeworkRepository.findAll();
    }

    public HomeworkEntity getFile(Long id) {
        Optional<HomeworkEntity> file = homeworkRepository.findById(id);
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Homework with ID " + id + " not found");
        }
        return file.get();
    }

    public ResponseEntity<byte[]> downloadFile(Long id) {
        HomeworkEntity file = getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(file.getFileType()))
                .body(file.getData());
    }

    // Optional: If you want to store files on the disk
    public Path storeFile(MultipartFile file) throws IOException {
        Path path = Paths.get(uploadDir + file.getOriginalFilename());
        Files.copy(file.getInputStream(), path);
        return path;
    }
}
