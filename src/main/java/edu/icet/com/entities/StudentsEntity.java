package edu.icet.com.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="students")
public class StudentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String birthday;
    private String parent;
    private String username;
}
