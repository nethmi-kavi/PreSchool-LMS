package edu.icet.com.repository;

import edu.icet.com.entities.HomeworkEntity;
import edu.icet.com.entities.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeworkRepository extends JpaRepository<HomeworkEntity,Long> {
}
