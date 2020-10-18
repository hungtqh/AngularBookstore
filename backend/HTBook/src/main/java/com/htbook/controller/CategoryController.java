package com.htbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htbook.entity.Category;
import com.htbook.entity.SubCategory;
import com.htbook.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/getAllCategories") 
	public List<Category> getAllCategories() {
		return categoryService.findAll();
	}
	
	@PostMapping("/addCategory")
	public ResponseEntity<String> addCategory(@RequestBody Category category) {
		
		if (categoryService.findCategoryByName(category.getName()) != null) {
			return new ResponseEntity<String>("categoryExists", HttpStatus.BAD_REQUEST);
		}
		
		categoryService.addCategory(category);
		return new ResponseEntity<String>("Category Added!", HttpStatus.OK);
	}
	
	@PostMapping("/getSubCategories") 
	public List<SubCategory> getSubCategories(@RequestBody Category category) {
		return categoryService.getSubCategories(category);
	}
	
	@PostMapping("/getCategoryById") 
	public Category getCategoryById(@RequestBody Long id) {
		return categoryService.findCategoryById(id);
	}
	
	@PostMapping("/getSubCategoryById") 
	public SubCategory getSubCategoryById(@RequestBody Long id) {
		return categoryService.findSubCategoryById(id);
	}
	
	@PostMapping("/updateCategory")
	public ResponseEntity<String> updateCategory(@RequestBody Category category) {
		
		Category dbCategory = categoryService.findCategoryByName(category.getName());
		
		if (dbCategory != null && dbCategory.getId() != category.getId()) {
			return new ResponseEntity<String>("categoryExists", HttpStatus.BAD_REQUEST);
		}
		
		categoryService.updateCategory(category);
		return new ResponseEntity<String>("Category Updated!", HttpStatus.OK);
	}
	
	@PostMapping("/updateSubCategory")
	public ResponseEntity<String> updateSubCategory(@RequestBody SubCategory subCategory) {
		
		SubCategory dbSubCategory = categoryService.findSubCategoryByName(subCategory.getName());
		
		if (dbSubCategory != null && dbSubCategory.getId() != subCategory.getId()) {
			return new ResponseEntity<String>("subCategoryExists", HttpStatus.BAD_REQUEST);
		}
		
		categoryService.updateSubCategory(subCategory);
		return new ResponseEntity<String>("SubCategory Updated!", HttpStatus.OK);
	}
	
	@PostMapping("/addSubCategory") 
	public ResponseEntity<String> addSubCategory(@RequestBody SubCategory subCategory) {
		if (categoryService.findSubCategoryByName(subCategory.getName()) != null) {
			return new ResponseEntity<String>("subCategoryExists", HttpStatus.BAD_REQUEST);
		}
		
		categoryService.addSubCategory(subCategory);
		return new ResponseEntity<String>("Category Added!", HttpStatus.OK);
	}
}
