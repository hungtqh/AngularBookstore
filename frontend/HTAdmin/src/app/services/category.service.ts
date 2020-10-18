import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { SubCategory } from '../models/sub-category';
import { AppConst } from '../utils/app-const';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryPath: string = AppConst.serverPath + '/category';
  constructor(private http: HttpClient) { }

  addCategory(category: Category) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.categoryPath + '/addCategory',
      JSON.stringify(category),
      { headers: headers, responseType: 'text' }
    );
  }

  updateCategory(category: Category) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.categoryPath + '/updateCategory',
      JSON.stringify(category),
      { headers: headers, responseType: 'text' }
    );
  }

  updateSubCategory(subCategory: SubCategory) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.categoryPath + '/updateSubCategory',
      JSON.stringify(subCategory),
      { headers: headers, responseType: 'text' }
    );
  }

  getAll() {
    return this.http.get<Category[]>(
      this.categoryPath + '/getAllCategories',
      { responseType: 'json' }
    );
  }

  addSubCategory(subCategory: SubCategory) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.categoryPath + '/addSubCategory',
      JSON.stringify(subCategory),
      { headers: headers, responseType: 'text' }
    );
  }

  getSubCategories(category: Category) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SubCategory[]>(
      this.categoryPath + '/getSubCategories',
      JSON.stringify(category),
      { headers: headers, responseType: 'json' }
    );
  }

  getCategoryById(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>(
      this.categoryPath + '/getCategoryById',
      JSON.stringify(id),
      { headers: headers, responseType: 'json' }
    );
  }

  getSubCategoryById(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SubCategory>(
      this.categoryPath + '/getSubCategoryById',
      JSON.stringify(id),
      { headers: headers, responseType: 'json' }
    );
  }
}
