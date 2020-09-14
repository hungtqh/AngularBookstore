package com.htbook.service;

import java.util.List;

import com.htbook.entity.Category;
import com.htbook.entity.SubCategory;

public interface CategoryService {
	void addCategory(Category category);
	void updateCategory(Category category);
	void addSubCategory(SubCategory subCategory);
	void updateSubCategory(SubCategory subCategory);
	
	Category findCategoryByName(String name);
	Category findCategoryById(Long id);
	
	SubCategory findSubCategoryByName(String name);
	SubCategory findSubCategoryById(Long id);
	
	List<Category> findAll();
	List<SubCategory> getSubCategories(Category category);
}
