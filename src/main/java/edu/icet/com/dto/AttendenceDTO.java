package edu.icet.com.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AttendenceDTO {
    private LocalDate date;
    private List<AttendenceItem> items;
}
