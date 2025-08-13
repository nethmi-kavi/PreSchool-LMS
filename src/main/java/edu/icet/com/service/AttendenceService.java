package edu.icet.com.service;

import edu.icet.com.dto.AttendenceDTO;
import edu.icet.com.dto.AttendenceItem;
import edu.icet.com.entities.AttendenceEntity;
import edu.icet.com.entities.AttendenceItemEntity;
import edu.icet.com.entities.ParentEntity;
import edu.icet.com.repository.AttendenceItemRepository;
import edu.icet.com.repository.AttendenceRepository;
import edu.icet.com.repository.ParentRepository;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
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
    private ParentRepository pr;

    @Autowired
    private AttendenceRepository ar;

    @Autowired
    private AttendenceItemRepository ai;

    private static final Logger logger = LoggerFactory.getLogger(AttendenceService.class);

    public void submitAttendence(AttendenceDTO attendenceDto) {
        LocalDate date = attendenceDto.getDate();

        if (attendenceDto.getItems() != null) {
            for (AttendenceItem item : attendenceDto.getItems()) {
                Long parentId = item.getParentId();
                String name = item.getStudent_name();
                String username = item.getUsername();
                String status = item.getStatus();

                ParentEntity parentEntity = pr.findById(parentId).orElse(null);
                if (parentEntity != null) {
                    AttendenceItemEntity att = new AttendenceItemEntity();
                    att.setParent(parentEntity);
                    att.setDate(date);
                    att.setStudent_name(name);
                    att.setUsername(username);
                    att.setStatus(status);
                    ai.save(att);
                }
            }
        } else {

            System.out.println("Warning: AttendenceDTO items list is null");
        }


        AttendenceEntity attendance = new AttendenceEntity();
        attendance.setDate(date);
        ar.save(attendance);
    }

    public List<AttendenceItem> getAbsentParents() {
        LocalDate today = LocalDate.now();
        List<AttendenceItemEntity> attendanceEntities = ai.findByDate(today);
        List<AttendenceItem> absentParents = new ArrayList<>();

        for (AttendenceItemEntity entity : attendanceEntities) {
            if ("Absent".equalsIgnoreCase(entity.getStatus())) {
                AttendenceItem item = mp.map(entity, AttendenceItem.class);
                absentParents.add(item);
                sendMessage(entity.getUsername(), entity.getStudent_name());
            }
        }
        return absentParents;
    }

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
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("School Absence Notification");
            message.setText("Dear Parent,\n\nYour child " + name +
                    " was marked absent from school today. Please inform us of the reason for the absence.\n\nThank you.");

            Transport.send(message);
            logger.info("Absence notification sent to {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }
}
