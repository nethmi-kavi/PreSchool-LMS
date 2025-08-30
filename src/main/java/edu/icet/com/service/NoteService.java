package edu.icet.com.service;
import edu.icet.com.entities.NoteEntity;
import edu.icet.com.repository.NoteRepository;
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
public class NoteService {

    @Autowired
    NoteRepository noteRepository;

        final String uploadDir = "uploads/";

    public NoteEntity saveFile(MultipartFile file, String title) throws IOException {
        NoteEntity note = NoteEntity.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .title(title)
                .data(file.getBytes())
                .build();
        return noteRepository.save(note);
    }
    public void deleteFile(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
        } else {
            throw new RuntimeException( id + " not found");
        }
    }
    public List<NoteEntity> getAllFiles() {
        return noteRepository.findAll();
    }

    public NoteEntity getFile(Long id) {
        Optional<NoteEntity> file = noteRepository.findById(id);
        if (file.isEmpty()) {
            throw new RuntimeException("Note with ID " + id + " not found");
        }
        return file.get();
    }

    public ResponseEntity<byte[]> downloadFile(Long id) {
        NoteEntity file = getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(file.getFileType()))
                .body(file.getData());
    }
}
