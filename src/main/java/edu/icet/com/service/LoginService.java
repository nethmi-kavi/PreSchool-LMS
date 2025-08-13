package edu.icet.com.service;

import edu.icet.com.entities.UserEntity;
import edu.icet.com.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public Integer loginSystem(String username, String password) {
        Integer roleId= userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .map(UserEntity::getRoleId)
                .orElse(null);

        System.out.println("Login check for username: " + username + ", Role ID: " + roleId);
        return roleId;
    }

    public void loginDashboard(int roleId){
        if(roleId==1){
            System.out.println("Admin Login ");
        } else if (roleId==2) {
            System.out.println("Parent Login ");
        } else if (roleId==3) {
            System.out.println("Teacher Login ");
        }
    }
}