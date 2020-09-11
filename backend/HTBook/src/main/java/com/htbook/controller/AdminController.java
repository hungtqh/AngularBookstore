package com.htbook.controller;

import java.security.Principal;
import java.util.HashMap;
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
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserService userService;

	@GetMapping("/login")
	public Map<String, Object> login(HttpSession session) {
		Map<String, Object> tokenData = new HashMap<>();
		tokenData.put("token", session.getId());
		tokenData.put("tokenTimeout", session.getMaxInactiveInterval());

		return tokenData;
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
