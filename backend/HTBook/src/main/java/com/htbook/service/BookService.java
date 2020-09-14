package com.htbook.service;

import java.util.List;

import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;

public interface BookService {
	void addBook(Book book);
	void updateBook(Book book);
	List<Book> getBooksBySubCategory(SubCategory subCategory);
	List<Book> getBooksByCategory(Long subCategoryId, Long categoryId);
	List<Book> getAllBook();
	Book findByTitle(String title);
	Book findById(Long id);
}
