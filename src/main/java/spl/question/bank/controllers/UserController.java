package spl.question.bank.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {


    @RequestMapping("/api/secure")
    public String abc() {
        return "secured ";
    }

    @RequestMapping("/not/secure")
    public String def() {
        return "not secured";
    }
}
