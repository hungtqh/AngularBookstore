package com.htbook.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.htbook.entity.Book;
import com.htbook.entity.SubCategory;
import com.htbook.util.response.AgencyCountResponse;
import com.htbook.util.response.AuthorCountResponse;
import com.htbook.util.response.SubCategoryCountResponse;

public interface BookRepository extends JpaRepository<Book, Long>{
	Book findByTitle(String title);
	List<Book> findBookBySubCategory(SubCategory subCategory);
	
	@Query("Select b From Book b Where b.subCategory.category.id = ?1")
	List<Book> findBookByCategory(Long categoryId);

	@Query("Select b.author As author, count(b) As count From Book b "
			+ "Where b.subCategory.category.id = ?1 And b.active = true "
			+ "Group by b.author")
	List<AuthorCountResponse> countBookInCategoryByAuthor(Long categoryId);
	
	@Query("Select b.agency As agency, count(b) As count From Book b "
			+ "Where b.subCategory.category.id = ?1 And b.active = true "
			+ "Group by b.agency")
	List<AgencyCountResponse> countBookInCategoryByAgency(Long categoryId);
	
	@Query("Select b.author As author, count(b) As count From Book b "
			+ "Where b.subCategory.id = ?1 And b.active = true "
			+ "Group by b.author")
	List<AuthorCountResponse> countBookInSubCategoryByAuthor(Long subCategoryId);
	
	@Query("Select b.agency As agency, count(b) As count From Book b "
			+ "Where b.subCategory.id = ?1 And b.active = true "
			+ "Group by b.agency")
	List<AgencyCountResponse> countBookInSubCategoryByAgency(Long subCategoryId);
	
	@Query("Select b.subCategory.id As id, b.subCategory.name As name, count(b) As count From Book b "
			+ "Where b.subCategory.category.id = ?1 And b.active = true "
			+ "Group by b.subCategory.id")
	List<SubCategoryCountResponse> countBookInSubCategory(Long categoryId);
	
	List<Book> findTop5ByActiveTrueAndSubCategoryOrderByPublicationDateDesc(SubCategory subCategory);
	List<Book> findTop5ByActiveTrueAndAuthorAndSubCategoryOrderByPublicationDateDesc(String author, SubCategory subCategory);
	List<Book> findTop5ByActiveTrueAndAgencyAndSubCategoryOrderByPublicationDateDesc(String agency, SubCategory subCategory);
	
	@Query("Select b From Book b Where b.subCategory.category.id = ?1 Order by b.publicationDate Desc")
	List<Book> findTop5NewBookByCategory(Long categoryId, Pageable pageable);
	
	@Query("Select b From Book b Where b.subCategory.category.id = ?1 And b.author = ?2 Order by b.publicationDate Desc")
	List<Book> findTop5NewBookInCategoryByAuthor(Long categoryId, String author, Pageable pageable);
	
	@Query("Select b From Book b Where b.subCategory.category.id = ?1 And b.agency = ?2 Order by b.publicationDate Desc")
	List<Book> findTop5NewBookInCategoryByAgency(Long categoryId, String agency, Pageable pageable);
}
	