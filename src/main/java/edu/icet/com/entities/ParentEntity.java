package edu.icet.com.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="parent")
public class ParentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private String mobile;
    private String username;
    private String password;
}
