package edu.icet.com.repository;


import edu.icet.com.entities.StudentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentsRepository extends JpaRepository<StudentsEntity,Long> {

}
