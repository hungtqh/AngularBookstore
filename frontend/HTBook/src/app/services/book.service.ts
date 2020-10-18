import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { SubCategory } from '../models/sub-category';
import { AppConst } from '../utils/app-const';
import { AgencyCountResponse } from '../utils/response/agency-count-response';
import { AuthorCountResponse } from '../utils/response/author-count-response';
import { SubCategoryCountResponse } from '../utils/response/subcategory-count-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookPath = AppConst.serverPath + '/book';
  constructor(private http: HttpClient) { }

  getAllBook() {
    return this.http.get<Book[]>(
      this.bookPath + '/getAllBook',
      { responseType: 'json' }
    );
  }

  getBookById(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Book>(
      this.bookPath + '/getBookById',
      JSON.stringify(id),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookByCategory(categoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookByCategory',
      JSON.stringify(categoryId),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookBySubCategory(subCategory: SubCategory) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookBySubCategory',
      JSON.stringify(subCategory),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookByAuthorAndSubCategory(author: string, subCategory: SubCategory) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let data = {
      'author': author,
      'subCategory': subCategory
    };

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookByAuthorAndSubCategory',
      JSON.stringify(data),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookByAgencyAndSubCategory(agency: string, subCategory: SubCategory) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let data = {
      'agency': agency,
      'subCategory': subCategory
    };

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookByAgencyAndSubCategory',
      JSON.stringify(data),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookInCategoryByAuthor(categoryId: number, author: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let data = {
      'categoryId': categoryId,
      'author': author
    };

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookInCategoryByAuthor',
      JSON.stringify(data),
      { headers: headers, responseType: 'json' }
    );
  }

  getNewBookInCategoryByAgency(categoryId: number, agency: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let data = {
      'categoryId': categoryId,
      'agency': agency
    };

    return this.http.post<Book[]>(
      this.bookPath + '/getNewBookInCategoryByAgency',
      JSON.stringify(data),
      { headers: headers, responseType: 'json' }
    );
  }

  countBookInCategoryByAuthor(categoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthorCountResponse[]>(
      this.bookPath + '/countBookInCategoryByAuthor',
      JSON.stringify(categoryId),
      { headers: headers, responseType: 'json' }
    );
  }

  countBookInCategoryByAgency(categoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AgencyCountResponse[]>(
      this.bookPath + '/countBookInCategoryByAgency',
      JSON.stringify(categoryId),
      { headers: headers, responseType: 'json' }
    );
  }

  countBookInSubCategoryByAuthor(subCategoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthorCountResponse[]>(
      this.bookPath + '/countBookInSubCategoryByAuthor',
      JSON.stringify(subCategoryId),
      { headers: headers, responseType: 'json' }
    );
  }

  countBookInSubCategoryByAgency(subCategoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AgencyCountResponse[]>(
      this.bookPath + '/countBookInSubCategoryByAgency',
      JSON.stringify(subCategoryId),
      { headers: headers, responseType: 'json' }
    );
  }

  countBookInSubCategory(categoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SubCategoryCountResponse[]>(
      this.bookPath + '/countBookInSubCategory',
      JSON.stringify(categoryId),
      { headers: headers, responseType: 'json' }
    );
  }
}


