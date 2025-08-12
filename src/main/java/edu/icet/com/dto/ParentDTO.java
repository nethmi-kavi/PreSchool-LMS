package edu.icet.com.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class ParentDTO {
    private Long id;
    private String studentName;
    private String mobile;
    private String username;
    private String password;


}
