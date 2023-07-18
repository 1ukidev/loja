package com.lukidev.loja;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password, Model model) {
        Cegonha cegonha = userRepository.findByEmail(email);
        // System.out.println("E-mail: " + email);

        if (cegonha != null && cegonha.getPassword().equals(password)) {
            // model.addAttribute("email", email);
            return "test";
        } else {
            // model.addAttribute("error", "Invalid username or password");
            return "test";
        }
    }

}