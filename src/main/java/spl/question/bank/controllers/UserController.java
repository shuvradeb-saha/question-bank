package spl.question.bank.controllers;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
public class UserController {
    @RequestMapping("/api/secure")
    public String abc() {
        return "secured ";
    }

    @RequestMapping("/not/secure")
    public String def(@RequestBody Object sd) {
        logger.info("Object= {}", sd.toString());
        return "not secured";
    }
}
