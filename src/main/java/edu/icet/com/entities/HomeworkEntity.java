package edu.icet.com.entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;  // Import this annotation

@Data
@Entity
@Table(name = "homework")
@Builder
@NoArgsConstructor
@AllArgsConstructor  // Add this annotation
public class HomeworkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String title;

    @Lob
    private byte[] data;
}
