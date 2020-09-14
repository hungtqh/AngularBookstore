package com.htbook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;

public interface BookRepository extends JpaRepository<Book, Long>{
	Book findByTitle(String title);
	List<Book> findBookBySubCategory(SubCategory subCategory);
	
	@Query("Select b From Book b, SubCategory subCat, Category cat " + "Where b.subCategory.id = ?1 And "
			+ "subCat.category.id = ?2")
	List<Book> findBookByCategory(Long subCategoryId, Long categoryId);
}
