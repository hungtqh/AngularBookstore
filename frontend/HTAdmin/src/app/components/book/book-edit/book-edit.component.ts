import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/sub-category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  editMode: boolean;
  categoryChanged: boolean;
  categories: Category[];
  subCategories: SubCategory[];
  bookForm: FormGroup;
  book: Book;
  id: number;
  categoryId: number;

  constructor(private categoryService: CategoryService, private bookService: BookService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categories = [];
    this.book = new Book();

    this.bookForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required]),
      'subCategory': new FormControl('', [Validators.required]),
      'imageUrl': new FormControl('', [Validators.required]),
      'author': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'publisher': new FormControl('', [Validators.required]),
      'publicationDate': new FormControl('', [Validators.required]),
      'cover': new FormControl('', [Validators.required]),
      'agency': new FormControl('', [Validators.required]),
      'listPrice': new FormControl('', [Validators.required]),
      'discountRate': new FormControl('', [Validators.required]),
      'pages': new FormControl('', [Validators.required]),
      'size': new FormControl('', [Validators.required]),
      'sku': new FormControl('', [Validators.required]),
      'quantityInStock': new FormControl('', [Validators.required]),
      'active': new FormControl('')
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];

        this.bookService.getBookById(this.id).subscribe(
          book => {
            this.book = book;
            this.editMode = true;
            this.bookForm.setValue({
              'title': book.title,
              'imageUrl': book.imageUrl,
              'category': book.subCategory.category.id,
              'subCategory': book.subCategory.id,
              'author': book.author,
              'publisher': book.publisher,
              'publicationDate': book.publicationDate,
              'description': book.description,
              'cover': book.cover,
              'agency': book.agency,
              'listPrice': book.listPrice,
              'discountRate': book.discountRate,
              'pages': book.pages,
              'size': book.size,
              'sku': book.sku,
              'quantityInStock': book.quantityInStock,
              'active': book.active
            });
          },
          error => {
            console.log(error);
            this.editMode = false;
          }
        )
      }
    });

    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;

        if (!this.editMode) {
          this.categoryId = categories[0].id;
          this.getSubCategories();
        } else {
          this.categoryId = this.book.subCategory.category.id;
          this.getSubCategories();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onCategoryChange(event) {
    this.categoryId = this.categories.find(category => category.id === +event.target.value).id;
    this.categoryChanged = true;
    this.getSubCategories();
  }

  getSubCategories() {
    let category = new Category();
    category.id = this.categoryId;

    this.categoryService.getSubCategories(category).subscribe(
      subCategories => {
        this.subCategories = subCategories;
        this.bookForm.get('category').setValue(this.categoryId);

        if (!this.editMode || this.categoryChanged) {
          this.bookForm.get('subCategory').setValue(this.subCategories[0].id);
          this.categoryChanged = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    let title = this.bookForm.get('title').value;
    let subCategoryId = +this.bookForm.get('subCategory').value;
    let imageUrl = this.bookForm.get('imageUrl').value;
    let author = this.bookForm.get('author').value;
    let publisher = this.bookForm.get('publisher').value;
    let description = this.bookForm.get('description').value;
    let publicationDate = this.bookForm.get('publicationDate').value;
    let cover = this.bookForm.get('cover').value;
    let agency = this.bookForm.get('agency').value;
    let listPrice = this.bookForm.get('listPrice').value;
    let discountRate = this.bookForm.get('discountRate').value;
    let pages = this.bookForm.get('discountRate').value;
    let size = this.bookForm.get('size').value;
    let sku = this.bookForm.get('sku').value;
    let quantityInStock = this.bookForm.get('quantityInStock').value;
    let active = this.bookForm.get('active');

    this.book.title = title;
    let subCategory = new SubCategory();
    subCategory.id = subCategoryId;
    this.book.subCategory = subCategory;
    this.book.imageUrl = imageUrl;
    this.book.author = author;
    this.book.description = description;
    this.book.publisher = publisher;
    this.book.publicationDate = publicationDate;
    this.book.cover = cover;
    this.book.agency = agency;
    this.book.listPrice = listPrice;
    this.book.discountRate = discountRate;
    this.book.pages = pages;
    this.book.size = size;
    this.book.sku = sku;
    this.book.quantityInStock = quantityInStock;
    this.book.active = !!active;

    if (!this.editMode) {
      this.bookService.addBook(this.book).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/book']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.bookService.updateBook(this.book).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/book']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
