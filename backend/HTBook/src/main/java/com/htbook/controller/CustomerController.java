package com.htbook.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htbook.entity.Role;
import com.htbook.entity.User;
import com.htbook.entity.UserRole;
import com.htbook.service.UserService;
import com.htbook.util.SecurityUtil;

@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		
		if (userService.findByPhone(user.getPhoneNumber()) != null) {
			return new ResponseEntity<String>("phoneExists", HttpStatus.BAD_REQUEST);
		}

		if (userService.findByEmail(user.getEmail()) != null) {
			return new ResponseEntity<String>("emailExists", HttpStatus.BAD_REQUEST);
		}

		String encryptedPassword = SecurityUtil.passwordEncoder().encode(user.getPassword());
		user.setPassword(encryptedPassword);

		Role role = new Role();
		role.setId(2L);
		role.setName("ROLE_USER");
		
		Set<UserRole> userRoles = new HashSet<>();
		userRoles.add(new UserRole(user, role));
		user.setUserRoles(userRoles);
		
		
		user.getCustomer().setUser(user);
		
		userService.createUser(user, userRoles);

		return new ResponseEntity<String>("Registered Successfully!", HttpStatus.OK);
	}
}