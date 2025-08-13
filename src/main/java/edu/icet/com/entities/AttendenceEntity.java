package edu.icet.com.entities;

import edu.icet.com.dto.AttendenceItem;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name="attendence")
public class AttendenceEntity {
    @Id
    private LocalDate date;
}
