package edu.icet.com.service;

import edu.icet.com.entities.TeacherEntity;
import edu.icet.com.entities.UserEntity;
import edu.icet.com.repository.TeacherRepository;
import edu.icet.com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    public void addTeachers(TeacherEntity t1){
        TeacherEntity teacher =new TeacherEntity();
        teacher.setName(t1.getName());
        teacher.setMobile(t1.getMobile());
        teacher.setAddress(t1.getAddress());
        teacher.setUsername(t1.getUsername());
        teacher.setPassword(t1.getPassword());

        teacherRepository.save(teacher);

        UserEntity user = new UserEntity();
        user.setUsername(t1.getUsername());
        user.setPassword(t1.getPassword());
        user.setRoleId(3);

        userRepository.save(user);
    }

    public void deleteTeachers(Long id) {
        if (teacherRepository.existsById(id)) {
            teacherRepository.deleteById(id);
        } else {
            throw new RuntimeException("File with ID " + id + " not found");
        }
    }
}
