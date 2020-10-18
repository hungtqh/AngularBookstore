package com.htbook.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.htbook.dao.BookRepository;
import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.service.BookService;
import com.htbook.util.response.AgencyCountResponse;
import com.htbook.util.response.AuthorCountResponse;
import com.htbook.util.response.SubCategoryCountResponse;

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
	public List<Book> getBooksByCategory(Long categoryId) {
		return bookRepository.findBookByCategory(categoryId);
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

	@Override
	public List<AuthorCountResponse> countBookInCategoryByAuthor(Long categoryId) {
		return bookRepository.countBookInCategoryByAuthor(categoryId);
	}

	@Override
	public List<AgencyCountResponse> countBookInCategoryByAgency(Long categoryId) {
		return bookRepository.countBookInCategoryByAgency(categoryId);
	}

	@Override
	public List<SubCategoryCountResponse> countBookInSubCategory(Long categoryId) {
		return bookRepository.countBookInSubCategory(categoryId);
	}

	@Override
	public List<AuthorCountResponse> countBookInSubCategoryByAuthor(Long subCategoryId) {
		return bookRepository.countBookInSubCategoryByAuthor(subCategoryId);
	}

	@Override
	public List<AgencyCountResponse> countBookInSubCategoryByAgency(Long subCategoryId) {
		return bookRepository.countBookInSubCategoryByAgency(subCategoryId);
	}

	@Override
	public List<Book> getNewBookByCategory(Long categoryId) {
		return bookRepository.findTop5NewBookByCategory(categoryId, PageRequest.of(0,5));
	}

	@Override
	public List<Book> getNewBookBySubCategory(SubCategory subCategory) {
		return bookRepository.findTop5ByActiveTrueAndSubCategoryOrderByPublicationDateDesc(subCategory);
	}

	@Override
	public List<Book> getNewBookByAuthorAndSubCategory(String author, SubCategory subCategory) {
		return bookRepository.findTop5ByActiveTrueAndAuthorAndSubCategoryOrderByPublicationDateDesc(author, subCategory);
	}

	@Override
	public List<Book> getNewBookByAgencyAndSubCategory(String agency, SubCategory subCategory) {
		return bookRepository.findTop5ByActiveTrueAndAgencyAndSubCategoryOrderByPublicationDateDesc(agency, subCategory);
	}

	@Override
	public List<Book> getNewBookInCategoryByAuthor(Long categoryId, String author) {
		return bookRepository.findTop5NewBookInCategoryByAuthor(categoryId, author, PageRequest.of(0,5));
	}

	@Override
	public List<Book> getNewBookInCategoryByAgency(Long categoryId, String agency) {
		return bookRepository.findTop5NewBookInCategoryByAgency(categoryId, agency, PageRequest.of(0,5));
	}

}
