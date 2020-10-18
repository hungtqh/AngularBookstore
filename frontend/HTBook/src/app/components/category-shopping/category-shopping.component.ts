import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/sub-category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { AgencyCountResponse } from 'src/app/utils/response/agency-count-response';
import { AuthorCountResponse } from 'src/app/utils/response/author-count-response';
import { SubCategoryCountResponse } from 'src/app/utils/response/subcategory-count-response';
declare var $: any;

@Component({
  selector: 'app-category-shopping',
  templateUrl: './category-shopping.component.html',
  styleUrls: ['./category-shopping.component.css']
})
export class CategoryShoppingComponent implements OnInit {
  categoryId: number;
  subCategoryId: number;
  categoryName: string;
  authorFilter: boolean;
  agencyFilter: boolean;

  authors: AuthorCountResponse[];
  agencies: AgencyCountResponse[];
  subCategories: SubCategoryCountResponse[];
  newBooks: Book[];

  constructor(private categoryService: CategoryService, private bookService: BookService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    $('.hero__categories ul').removeClass('d-block');

    $('.hero__categories__all').on('click', () => {
      $('.hero__categories ul').slideToggle(400);
    });

    this.authorFilter = true;
    this.agencyFilter = true;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoryId = params['id'];

        this.categoryService.getCategoryById(this.categoryId).subscribe(
          category => {
            this.categoryName = category.name;
            // sub category param listener
            this.route.queryParams.subscribe(queryParams => {

              let author = queryParams['author'];
              let agency = queryParams['agency'];

              // if subcategory chosen
              if (queryParams['sub-category']) {
                this.subCategoryId = queryParams['sub-category'];

                this.categoryService.getSubCategoryById(this.subCategoryId).subscribe(
                  subCategory => {
                    this.categoryName = subCategory.name;

                    if (author) {
                      this.agencyFilter = false;
                      this.bookService.getNewBookByAuthorAndSubCategory(author, subCategory).subscribe(
                        newBooks => {
                          this.newBooks = newBooks;
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    } else if (agency) {
                      this.authorFilter = false;
                      this.bookService.getNewBookByAgencyAndSubCategory(agency, subCategory).subscribe(
                        newBooks => {
                          this.newBooks = newBooks;
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    } else {
                      this.agencyFilter = true;
                      this.authorFilter = true;

                      this.bookService.getNewBookBySubCategory(subCategory).subscribe(
                        newBooks => {
                          console.log(newBooks);
                          this.newBooks = newBooks;
                        },
                        error => {
                          console.log(error);
                        }
                      )
                    }

                  },
                  error => {
                    console.log(error);
                  }
                );

                this.bookService.countBookInSubCategoryByAuthor(this.subCategoryId).subscribe(
                  authors => {
                    this.authors = authors;
                  },
                  error => {
                    console.log(error);
                  }
                );

                this.bookService.countBookInSubCategoryByAgency(this.subCategoryId).subscribe(
                  agencies => {
                    this.agencies = agencies;
                  },
                  error => {
                    console.log(error);
                  }
                );

              } else {
                this.categoryName = category.name;

                if (author) {
                  this.agencyFilter = false;
                  this.bookService.getNewBookInCategoryByAuthor(this.categoryId, author).subscribe(
                    newBooks => {
                      this.newBooks = newBooks;
                    },
                    error => {
                      console.log(error);
                    }
                  );
                } else if (agency) {
                  this.authorFilter = false;
                  this.bookService.getNewBookInCategoryByAgency(this.categoryId, agency).subscribe(
                    newBooks => {
                      this.newBooks = newBooks;
                      console.log(newBooks)
                    },
                    error => {
                      console.log(error);
                    }
                  );
                } else {
                  this.agencyFilter = true;
                  this.authorFilter = true;

                  this.bookService.getNewBookByCategory(this.categoryId).subscribe(
                    newBooks => {
                      console.log(newBooks);
                      this.newBooks = newBooks;
                    },
                    error => {
                      console.log(error);
                    }
                  );
                }

                this.bookService.countBookInCategoryByAuthor(this.categoryId).subscribe(
                  authors => {
                    this.authors = authors;
                    console.log(authors);
                  },
                  error => {
                    console.log(error);
                  }
                );

                // count book by agency for sub categories
                this.bookService.countBookInCategoryByAgency(this.categoryId).subscribe(
                  agencies => {
                    this.agencies = agencies;
                    console.log(agencies);
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
            });
          },
          error => {
            console.log(error);
          }
        );

        // count book for sub categories
        this.bookService.countBookInSubCategory(this.categoryId).subscribe(
          subCategories => {
            this.subCategories = subCategories;
            console.log(subCategories);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
