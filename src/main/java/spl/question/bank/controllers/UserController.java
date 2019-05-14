package spl.question.bank.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

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
