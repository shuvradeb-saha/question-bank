package spl.question.bank.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
