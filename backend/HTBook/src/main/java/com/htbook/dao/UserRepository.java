package com.htbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htbook.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmailOrPhoneNumber(String email, String phoneNumber);
	User findByEmail(String email);
	User findByPhoneNumber(String phone);
}
