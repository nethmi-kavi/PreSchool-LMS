package edu.icet.com.controller;

import edu.icet.com.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/{username}/{password}")
    public void loginSystem(@PathVariable String username, @PathVariable String password) {
        Integer output=loginService.loginSystem(username,password);

        loginService.loginDashboard(output);
    }

}
