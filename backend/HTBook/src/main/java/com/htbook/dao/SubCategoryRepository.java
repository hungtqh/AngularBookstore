package com.htbook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htbook.entity.Category;
import com.htbook.entity.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>{
	List<SubCategory> findByCategory(Category category);

	SubCategory findByName(String name);
}
