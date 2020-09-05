package com.htbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htbook.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

}
