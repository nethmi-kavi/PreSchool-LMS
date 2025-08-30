package edu.icet.com.service;

import edu.icet.com.entities.AttendenceItemEntity;
import edu.icet.com.repository.AttendenceItemRepository;
import edu.icet.com.repository.ParentRepository;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class AttendenceService {
    private final ModelMapper mp = new ModelMapper();

    @Autowired
    private ParentRepository parentRepository;


    @Autowired
    private AttendenceItemRepository attendenceItemRepository;

    private static final Logger logger = LoggerFactory.getLogger(AttendenceService.class);

    @Transactional
    public Boolean submitAttendence(List<AttendenceItemEntity> attendenceDtoList) {
        try {

            attendenceDtoList.forEach(item -> {
                System.out.println("Processing: " + item.getName() + ", " + item.getUsername());
            });

            for (AttendenceItemEntity item : attendenceDtoList) {
                if (item.getName() == null || item.getUsername() == null) {
                    throw new RuntimeException("Missing required fields for attendance submission.");
                }

                AttendenceItemEntity itemE = new AttendenceItemEntity();
                itemE.setDate(item.getDate());
                itemE.setStatus(item.getStatus());
                itemE.setName(item.getName());
                itemE.setUsername(item.getUsername());

                attendenceItemRepository.save(itemE);
            }
            return true; // ✅ transaction commits if no error
        } catch (Exception e) {
            System.err.println("Error in submitAttendence: " + e.getMessage()); // Log the error
            throw new RuntimeException("Failed to submit attendance: " + e.getMessage(), e);
        }
    }


    public List<AttendenceItemEntity> getAbsentParents() {
        LocalDate today = LocalDate.now();
        List<AttendenceItemEntity> attendanceEntities = attendenceItemRepository.findByDate(today);
        List<AttendenceItemEntity> absentParents = new ArrayList<>();

        for (AttendenceItemEntity entity : attendanceEntities) {
            if ("Absent".equalsIgnoreCase(entity.getStatus())) {
                AttendenceItemEntity item = mp.map(entity, AttendenceItemEntity.class);
                absentParents.add(item);
                sendMessage(entity.getUsername(), entity.getName());
            }
        }
        return absentParents;
    }

    /**
     * Send email notification to the parent about absence.
     */
    public void sendMessage(String toEmail, String name) {
        final String fromEmail = "kavindyarathnayake456@gmail.com";
        final String password = "mvza cque ntgs moli";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("School Absence Notification");
            message.setText("Dear Parent,\n\nYour child " + name +
                    " was marked absent from school today. Please inform us of the reason for the absence.\n\nThank you.");

            Transport.send(message);
            logger.info("Absence notification sent to {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }

    public List<AttendenceItemEntity> getByDate(String date) {
        return  attendenceItemRepository.findByDate(LocalDate.parse(date));
    }
}
