package edu.icet.com.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private int roleId;
}
