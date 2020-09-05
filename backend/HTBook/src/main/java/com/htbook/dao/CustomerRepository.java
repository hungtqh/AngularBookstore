package com.htbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htbook.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
