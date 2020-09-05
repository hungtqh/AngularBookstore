package com.htbook.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htbook.entity.User;
import com.htbook.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/login")
	public Map<String, String> login(HttpSession session) {
		return Collections.singletonMap("token", session.getId());
	}

	@GetMapping("/checkSession")
	public ResponseEntity<String> checkSession() {
		return new ResponseEntity<String>("Session Active!", HttpStatus.OK);
	}

	@GetMapping(value = "/logout")
	public ResponseEntity<String> logout() {
		SecurityContextHolder.clearContext();
		return new ResponseEntity<String>("Logout Successfully!", HttpStatus.OK);
	}
	
	@GetMapping("/getCurrentUser")
	public User getCurrentUser(Principal principal) {
		User user = null;
		
		if (principal != null) {
			user = userService.findByEmailOrPhone(principal.getName());
		}

		return user;
	}
}
