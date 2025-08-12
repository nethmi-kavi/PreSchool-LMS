package edu.icet.com.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="teachers")
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mobile;
    private String address;
    private String username;
    private String password;
}
