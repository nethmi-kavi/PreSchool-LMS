package edu.icet.com.service;


import edu.icet.com.entities.StudentsEntity;
import edu.icet.com.repository.StudentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentsService {
    @Autowired
    StudentsRepository studentsRepository;

    public void addStudent(StudentsEntity s1) {

        StudentsEntity students = new StudentsEntity();
        students.setName(s1.getName());
        students.setBirthday(s1.getBirthday());
        students.setParent(s1.getParent());
        students.setUsername(s1.getUsername());

        studentsRepository.save(students);
    }

    public List<String> getAllStudentsname (){
        return studentsRepository.findAll()
                .stream()
                .map(StudentsEntity::getName)
                .collect(Collectors.toList());

    }
    public List<StudentsEntity> getAllStudents(){
        return studentsRepository.findAll();
    }
}
