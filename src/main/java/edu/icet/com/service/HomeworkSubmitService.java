package edu.icet.com.service;

import edu.icet.com.entities.HomeworkSubmitEntity;
import edu.icet.com.repository.HomeworkSubmitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
@Service
public class HomeworkSubmitService {
    @Autowired
    private HomeworkSubmitRepository homeworkRepository;

    public HomeworkSubmitEntity submitHomework(String studentName, String homeworkTitle, MultipartFile file) throws IOException, IOException {
        // Get file data and metadata
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        byte[] fileData = file.getBytes();

        HomeworkSubmitEntity homework = HomeworkSubmitEntity.builder()
                .studentName(studentName)
                .homeworkTitle(homeworkTitle)
                .fileName(fileName)
                .fileType(fileType)
                .fileData(fileData)
                .submissionDate(new Date())
                .build();

        return homeworkRepository.save(homework);


    }
}
