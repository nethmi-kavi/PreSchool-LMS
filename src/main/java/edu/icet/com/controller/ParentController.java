package edu.icet.com.controller;

import edu.icet.com.entities.ParentEntity;
import edu.icet.com.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parents")
@CrossOrigin
public class ParentController {

    @Autowired
    private ParentService parentService;

    @PostMapping("/add")
    public void save(@RequestBody ParentEntity p1){
        parentService.addParent(p1);
    }


}
