package edu.icet.com.repository;

import edu.icet.com.entities.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<NoteEntity,Long> {
}
