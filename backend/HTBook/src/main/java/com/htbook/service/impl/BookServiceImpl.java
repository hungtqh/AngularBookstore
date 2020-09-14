package com.htbook.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htbook.dao.BookRepository;
import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;
	
	@Override
	public void addBook(Book book) {
		if (bookRepository.findByTitle(book.getTitle()) != null) {
			return;
		}
		
		bookRepository.save(book);
	}

	@Override
	public List<Book> getBooksBySubCategory(SubCategory subCategory) {
		return bookRepository.findBookBySubCategory(subCategory);
	}

	@Override
	public List<Book> getBooksByCategory(Long subCategoryId, Long categoryId) {
		return bookRepository.findBookByCategory(subCategoryId, categoryId);
	}

	@Override
	public Book findByTitle(String title) {
		return bookRepository.findByTitle(title);
	}

	@Override
	public Book findById(Long id) {
		return bookRepository.findById(id).get();
	}

	@Override
	public List<Book> getAllBook() {
		return bookRepository.findAll();
	}

	@Override
	public void updateBook(Book book) {
		bookRepository.save(book);
	}
	
}
