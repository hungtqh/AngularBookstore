package com.htbook.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.htbook.dao.CategoryRepository;
import com.htbook.dao.SubCategoryRepository;
import com.htbook.entity.Category;
import com.htbook.entity.SubCategory;
import com.htbook.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private SubCategoryRepository subCategoryRepository;
	
	@Override
	public void addCategory(Category category) {
		if (categoryRepository.findByName(category.getName()) != null) { // if exists
			return;
		}
		
		categoryRepository.save(category);
	}

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category findCategoryByName(String name) {
		return categoryRepository.findByName(name);
	}

	@Override
	public Category findCategoryById(Long id) {
		return categoryRepository.findById(id).get();
	}

	@Override
	public void updateCategory(Category category) {
		categoryRepository.save(category);
	}

	@Override
	public List<SubCategory> getSubCategories(Category category) {
		return subCategoryRepository.findByCategory(category);
	}

	@Override
	public void addSubCategory(SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
	}

	@Override
	public SubCategory findSubCategoryByName(String name) {
		return subCategoryRepository.findByName(name);
	}

	@Override
	public SubCategory findSubCategoryById(Long id) {
		return subCategoryRepository.findById(id).get();
	}

	@Override
	public void updateSubCategory(SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
	}
}
