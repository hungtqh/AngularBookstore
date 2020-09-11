package com.htbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HTBookApplication { //implements CommandLineRunner {

//	@Autowired
//	private UserService userService;
	
	public static void main(String[] args) {
		SpringApplication.run(HTBookApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//		User user = new User();
//
//		user.setEmail("admin@gmail.com");
//		String encryptedPassword = SecurityUtils.passwordEncoder().encode("admin");
//		user.setPassword(encryptedPassword);
//		user.setEnabled(true);
//
//		Role role = new Role();
//		role.setId(1L);
//		role.setName("ROLE_ADMIN");
//
//		Set<UserRole> userRoles = new HashSet<>();
//		userRoles.add(new UserRole(user, role));
//		user.setUserRoles(userRoles);
//
//		userService.createUser(user, userRoles);
//	}

}
