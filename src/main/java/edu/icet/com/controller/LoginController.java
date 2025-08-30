package edu.icet.com.controller;

import edu.icet.com.dto.LoginRequest;
import edu.icet.com.dto.ParentDTO;
import edu.icet.com.dto.UserDTO;
import edu.icet.com.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;


    @PostMapping("/login")
    public ResponseEntity loginSystem(@RequestBody LoginRequest loginRequest) {


        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Integer output = loginService.loginSystem(username, password);


        if (output == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
        loginService.loginDashboard(output);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("enum",output);
        return ResponseEntity.ok(response);
    }


}
