package com.htbook.service.impl;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.htbook.dao.RoleRepository;
import com.htbook.dao.UserRepository;
import com.htbook.entity.User;
import com.htbook.entity.UserRole;
import com.htbook.service.UserService;
import com.htbook.util.AppUtils;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User findByEmailOrPhone(String username) {
		return userRepository.findByEmailOrPhoneNumber(username, username);
	}

	@Override
	public void createUser(User user, Set<UserRole> userRoles) {
		String email = user.getEmail();
		String phoneNumber = user.getPhoneNumber();
		User localUser = null;
		
		if (!AppUtils.isEmpty(email)) {
			localUser = userRepository.findByEmail(email);
		} else if (!AppUtils.isEmpty(phoneNumber)) {
			localUser = userRepository.findByPhoneNumber(phoneNumber);
		}

		if (localUser != null) {
			LOG.info("User with username already exist. Nothing will be done. ");
			return;
		}

		for (UserRole ur : userRoles) {
			roleRepository.save(ur.getRole());
		}

		user.getUserRoles().addAll(userRoles);

		userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User findByPhone(String phone) {
		return userRepository.findByPhoneNumber(phone);
	}

	@Override
	public void save(User user) {
		userRepository.save(user);
	}

}
