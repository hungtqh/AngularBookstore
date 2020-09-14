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

import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.service.BookService;

@RestController
@RequestMapping("/book")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@PostMapping("/addBook")
	public ResponseEntity<String> addBook(@RequestBody Book book) {
		
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
	public List<Book> getBookByCategory(@RequestBody Long subCategoryId, @RequestBody Long categoryId) {
		return bookService.getBooksByCategory(subCategoryId, categoryId);
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
