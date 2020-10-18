package com.htbook.service;

import java.util.List;

import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.util.response.AgencyCountResponse;
import com.htbook.util.response.AuthorCountResponse;
import com.htbook.util.response.SubCategoryCountResponse;

public interface BookService {
	void addBook(Book book);
	void updateBook(Book book);
	
	List<Book> getBooksBySubCategory(SubCategory subCategory);
	List<Book> getBooksByCategory(Long categoryId);
	List<Book> getAllBook();
	List<Book> getNewBookByCategory(Long categoryId);
	List<Book> getNewBookBySubCategory(SubCategory subCategory);
	List<Book> getNewBookByAuthorAndSubCategory(String author, SubCategory subCategory);
	List<Book> getNewBookByAgencyAndSubCategory(String agency, SubCategory subCategory);
	List<Book> getNewBookInCategoryByAuthor(Long categoryId, String author);
	List<Book> getNewBookInCategoryByAgency(Long categoryId, String agency);
	List<AuthorCountResponse> countBookInCategoryByAuthor(Long categoryId);
	List<AgencyCountResponse> countBookInCategoryByAgency(Long categoryId);
	List<AuthorCountResponse> countBookInSubCategoryByAuthor(Long subCategoryId);
	List<AgencyCountResponse> countBookInSubCategoryByAgency(Long subCategoryId);
	List<SubCategoryCountResponse> countBookInSubCategory(Long categoryId);
	
	Book findByTitle(String title);
	Book findById(Long id);
}
