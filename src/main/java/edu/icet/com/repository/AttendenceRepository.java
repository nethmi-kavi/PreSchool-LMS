package edu.icet.com.repository;

import edu.icet.com.entities.AttendenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendenceRepository extends JpaRepository<AttendenceEntity,Long> {
}
