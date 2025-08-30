package edu.icet.com.repository;

import edu.icet.com.entities.HomeworkSubmitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkSubmitRepository  extends JpaRepository<HomeworkSubmitEntity, Long> {
}
