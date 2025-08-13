package edu.icet.com.service;

import edu.icet.com.dto.ParentDTO;
import edu.icet.com.entities.ParentEntity;
import edu.icet.com.entities.UserEntity;
import edu.icet.com.repository.ParentRepository;
import edu.icet.com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParentService {
    @Autowired
    private ParentRepository parentRepo;

    @Autowired
    private UserRepository userRepo;

    public void addParent(ParentEntity p1){

        ParentEntity parent = new ParentEntity();
        parent.setStudent_name(p1.getStudent_name());
        parent.setMobile(p1.getMobile());
        parent.setUsername(p1.getUsername());
        parent.setPassword(p1.getPassword());

        parentRepo.save(parent);

        UserEntity user = new UserEntity();
        user.setUsername(p1.getUsername());
        user.setPassword(p1.getPassword());
        user.setRoleId(2);

        userRepo.save(user);

    }
}
