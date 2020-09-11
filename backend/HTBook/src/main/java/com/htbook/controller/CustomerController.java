package com.htbook.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htbook.entity.Role;
import com.htbook.entity.User;
import com.htbook.entity.UserRole;
import com.htbook.service.UserService;
import com.htbook.util.AppUtils;
import com.htbook.util.SecurityUtils;

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

		String encryptedPassword = SecurityUtils.passwordEncoder().encode(user.getPassword());
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

	@PostMapping(value = "/updateProfile")
	public ResponseEntity<String> updateProfile(@RequestBody User user) {

		String email = user.getEmail();
		User dbUser = userService.findByEmail(email);

		String phoneNumber = user.getPhoneNumber();
		if (!AppUtils.isEmpty(phoneNumber) && userService.findByPhone(phoneNumber) != null) {
			if (userService.findByPhone(phoneNumber).getId() != user.getId()) { // phone not belong to this user
				return new ResponseEntity<String>("phoneExists", HttpStatus.BAD_REQUEST);
			}
		}

		BCryptPasswordEncoder passwordEncoder = SecurityUtils.passwordEncoder();
		String dbPassword = dbUser.getPassword();
		String oldPassword = user.getPassword();
		String newPassword = user.getNewPassword();

		if (!AppUtils.isEmpty(newPassword)) { // if change password request
			if (!AppUtils.isEmpty(dbPassword) && !AppUtils.isEmpty(oldPassword)) {
				if (passwordEncoder.matches(oldPassword, dbPassword)) {
					user.setPassword(passwordEncoder.encode(newPassword));
				} else {
					return new ResponseEntity<String>("oldPasswordIncorrect", HttpStatus.BAD_REQUEST);
				}
			} else if (AppUtils.isEmpty(dbPassword)) {
				user.setPassword(passwordEncoder.encode(newPassword)); // for user using fb and google login for the first time
			}
		} else { // no changes
			user.setPassword(dbPassword); 
		}

		String dbPhone = dbUser.getPhoneNumber();
		if (!AppUtils.isEmpty(dbPhone) && AppUtils.isEmpty(phoneNumber)) { // not change if already have one and try to
																			// empty phone
			user.setPhoneNumber(dbPhone);
		}

		user.getCustomer().setUser(user);
		userService.save(user);

		return new ResponseEntity<String>("Update Successfully!", HttpStatus.OK);
	}

}