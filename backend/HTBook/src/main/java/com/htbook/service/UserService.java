package com.htbook.service;

import java.util.Set;

import com.htbook.entity.User;
import com.htbook.entity.UserRole;

public interface UserService {
	
	User findByEmail(String email);
	User findByPhone(String phone);
	User findByEmailOrPhone(String username);
	void createUser(User user, Set<UserRole> userRoles);
}
