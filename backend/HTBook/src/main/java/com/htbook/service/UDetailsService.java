package com.htbook.service;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.htbook.dao.UserRepository;
import com.htbook.entity.User;

@Service
public class UDetailsService implements UserDetailsService {

	private static final Logger LOG = LoggerFactory.getLogger(UDetailsService.class);

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmailOrPhoneNumber(username, username);

		if (user == null) {
			LOG.warn("Username {} not found", username);
			throw new UsernameNotFoundException("Username " + username + " not found");
		}

		return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
				getAuthorities(user));
	}

	public Collection<? extends GrantedAuthority> getAuthorities(User user) {
		String[] userRoles = user.getUserRoles().stream().map((userRole) -> userRole.getRole().getName())
				.toArray(String[]::new);
		Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRoles);
		
		return authorities;
	}
}
