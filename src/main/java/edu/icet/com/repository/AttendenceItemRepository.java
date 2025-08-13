package edu.icet.com.repository;

import edu.icet.com.entities.AttendenceItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendenceItemRepository extends JpaRepository<AttendenceItemEntity,Long> {
    List<AttendenceItemEntity> findByDate(LocalDate today);
}
