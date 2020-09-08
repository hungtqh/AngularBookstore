package com.htbook.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htbook.entity.Customer;
import com.htbook.entity.Role;
import com.htbook.entity.User;
import com.htbook.entity.UserRole;
import com.htbook.service.UserService;
import com.htbook.util.FacebookUtils;
import com.htbook.util.GooglePojo;
import com.htbook.util.GoogleUtils;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private GoogleUtils googleUtils;

	@Autowired
	private FacebookUtils facebookUtils;

	@GetMapping("/login")
	public Map<String, Object> login(HttpSession session) {
		Map<String, Object> tokenData = new HashMap<>();
		tokenData.put("token", session.getId());
		tokenData.put("tokenTimeout", session.getMaxInactiveInterval());

		return tokenData;
	}

	@PostMapping("/login-google")
	public Map<String, Object> loginGoogle(HttpSession session, HttpServletRequest request,
			@RequestBody String authCode) throws ClientProtocolException, IOException {

		String accessToken = "";
		try {
			accessToken = googleUtils.getToken(authCode);
		} catch (Exception exc) {
			exc.printStackTrace();
			return null;
		}

		GooglePojo googlePojo = googleUtils.getUserInfo(accessToken);
		UserDetails userDetail = googleUtils.buildUser(googlePojo);
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null,
				userDetail.getAuthorities());
		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// create user
		if (userService.findByEmail(googlePojo.getEmail()) == null) {

			User user = new User();
			user.setEmail(googlePojo.getEmail());
			user.setEnabled(true);

			Role role = new Role();
			role.setId(2L);
			role.setName("ROLE_USER");

			Set<UserRole> userRoles = new HashSet<>();
			userRoles.add(new UserRole(user, role));
			user.setUserRoles(userRoles);

			Customer customer = new Customer();
			customer.setFullName(googlePojo.getName());
			customer.setUser(user);
			user.setCustomer(customer);

			userService.createUser(user, userRoles);
		}

		Map<String, Object> tokenData = new HashMap<>();
		tokenData.put("token", session.getId());
		tokenData.put("tokenTimeout", session.getMaxInactiveInterval());

		return tokenData;
	}

	@PostMapping("/login-facebook")
	public Map<String, Object> loginFacebook(HttpServletRequest request, HttpSession session,
			@RequestBody String authCode) throws ClientProtocolException, IOException {

		String accessToken = "";
		try {
			accessToken = facebookUtils.getToken(authCode);
		} catch (Exception exc) {
			exc.printStackTrace();
			return null;
		}

		Map<String, Object> returnData = new HashMap<>();
		com.restfb.types.User user = facebookUtils.getUserInfo(accessToken);
		
		// create user
		if (user.getEmail() != null) {
			if (userService.findByEmail(user.getEmail()) == null) {

				User newUser = new User();
				newUser.setEmail(user.getEmail());
				newUser.setEnabled(true);

				Role role = new Role();
				role.setId(2L);
				role.setName("ROLE_USER");

				Set<UserRole> userRoles = new HashSet<>();
				userRoles.add(new UserRole(newUser, role));
				newUser.setUserRoles(userRoles);

				Customer customer = new Customer();
				customer.setUser(newUser);
				customer.setFullName(user.getName());
				newUser.setCustomer(customer);

				userService.createUser(newUser, userRoles);
			}
			UserDetails userDetail = facebookUtils.buildUser(user);
			
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null,
					userDetail.getAuthorities());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			returnData.put("hasEmail", true);
			returnData.put("token", session.getId());
			returnData.put("tokenTimeout", session.getMaxInactiveInterval());
		} else {
			returnData.put("hasEmail", false);
		}

		return returnData;
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
