package com.htbook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.service.BookService;
import com.htbook.util.response.AgencyCountResponse;
import com.htbook.util.response.AuthorCountResponse;
import com.htbook.util.response.SubCategoryCountResponse;

@RestController
@RequestMapping("/book")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@PostMapping("/addBook")
	public ResponseEntity<String> addBook(@RequestBody Book book) {
		
		System.out.println(book.toString());
		
		if (bookService.findByTitle(book.getTitle()) != null) {
			return new ResponseEntity<String>("bookExists", HttpStatus.BAD_REQUEST);
		}
		
		bookService.addBook(book);
		return new ResponseEntity<String>("Book Added!", HttpStatus.OK);
	}
	
	@PostMapping("/getBookById") 
	public Book getBookById(@RequestBody Long id) {
		return bookService.findById(id);
	}
	
	@GetMapping("/getAllBook") 
	public List<Book> getAllBook() {
		return bookService.getAllBook();
	}
	
	@PostMapping("/getBookBySubCategory") 
	public List<Book> getBookBySubCategory(@RequestBody SubCategory subCategory) {
		return bookService.getBooksBySubCategory(subCategory);
	}
	
	@PostMapping("/getBookByCategory") 
	public List<Book> getBookByCategory(@RequestBody Long categoryId) {
		return bookService.getBooksByCategory(categoryId);
	}
	
	@PostMapping("/countBookInCategoryByAuthor") 
	public List<AuthorCountResponse> countBookInCategoryByAuthor(@RequestBody Long categoryId) {
		return bookService.countBookInCategoryByAuthor(categoryId);
	}
	
	@PostMapping("/countBookInCategoryByAgency") 
	public List<AgencyCountResponse> countBookInCategoryByAgency(@RequestBody Long categoryId) {
		return bookService.countBookInCategoryByAgency(categoryId);
	}
	
	@PostMapping("/countBookInSubCategoryByAuthor") 
	public List<AuthorCountResponse> countBookInSubCategoryByAuthor(@RequestBody Long subCategoryId) {
		return bookService.countBookInSubCategoryByAuthor(subCategoryId);
	}
	
	@PostMapping("/countBookInSubCategoryByAgency") 
	public List<AgencyCountResponse> countBookInSubCategoryByAgency(@RequestBody Long subCategoryId) {
		return bookService.countBookInSubCategoryByAgency(subCategoryId);
	}
	
	@PostMapping("/countBookInSubCategory") 
	public List<SubCategoryCountResponse> countBookInSubCategory(@RequestBody Long categoryId) {
		return bookService.countBookInSubCategory(categoryId);
	}
	
	@PostMapping("/getNewBookByCategory") 
	public List<Book> getNewBookByCategory(@RequestBody Long categoryId) {
		return bookService.getNewBookByCategory(categoryId);
	}
	
	@PostMapping("/getNewBookBySubCategory") 
	public List<Book> getNewBookBySubCategory(@RequestBody SubCategory subCategory) {
		return bookService.getNewBookBySubCategory(subCategory);
	}
	
	@PostMapping("/getNewBookByAuthorAndSubCategory") 
	public List<Book> getNewBookByAuthorAndSubCategory(@RequestBody HashMap<String, Object> mapper) {
		ObjectMapper om = new ObjectMapper();
		om.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		
		String author =  om.convertValue(mapper.get("author"), String.class);
		SubCategory subCategory =  om.convertValue(mapper.get("subCategory"), SubCategory.class);
		
		return bookService.getNewBookByAuthorAndSubCategory(author, subCategory);
	}
	
	@PostMapping("/getNewBookByAgencyAndSubCategory") 
	public List<Book> getNewBookByAgencyAndSubCategory(@RequestBody HashMap<String, Object> mapper) {
		ObjectMapper om = new ObjectMapper();
		om.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		
		String agency =  om.convertValue(mapper.get("agency"), String.class);
		SubCategory subCategory =  om.convertValue(mapper.get("subCategory"), SubCategory.class);
		
		return bookService.getNewBookByAgencyAndSubCategory(agency, subCategory);
	}
	
	@PostMapping("/getNewBookInCategoryByAuthor") 
	public List<Book> getNewBookInCategoryByAuthor(@RequestBody HashMap<String, Object> mapper) {
		ObjectMapper om = new ObjectMapper();
		om.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		
		String author =  om.convertValue(mapper.get("author"), String.class);
		Long categoryId =  om.convertValue(mapper.get("categoryId"), Long.class);
		
		return bookService.getNewBookInCategoryByAuthor(categoryId, author);
	}
	
	@PostMapping("/getNewBookInCategoryByAgency") 
	public List<Book> getNewBookInCategoryByAgency(@RequestBody HashMap<String, Object> mapper) {
		ObjectMapper om = new ObjectMapper();
		om.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		
		String agency =  om.convertValue(mapper.get("agency"), String.class);
		Long categoryId =  om.convertValue(mapper.get("categoryId"), Long.class);
		
		return bookService.getNewBookInCategoryByAgency(categoryId, agency);
	}
	
	@PostMapping("/updateBook")
	public ResponseEntity<String> updateBook(@RequestBody Book book) {
		
		Book dbBook = bookService.findByTitle(book.getTitle());
		
		if (dbBook != null && dbBook.getId() != book.getId()) {
			return new ResponseEntity<String>("bookExists", HttpStatus.BAD_REQUEST);
		}
		
		bookService.updateBook(book);
		return new ResponseEntity<String>("Book Updated!", HttpStatus.OK);
	}
}
