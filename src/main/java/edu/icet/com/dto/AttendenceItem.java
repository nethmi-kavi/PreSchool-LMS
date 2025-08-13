package edu.icet.com.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendenceItem {
    private LocalDate date;
    private String student_name;
    private String username;
    private String status;
    private Long parentId;
}
