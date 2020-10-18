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

  getAllCategories() {
    return this.http.get<Category[]>(
      this.categoryPath + '/getAllCategories',
      { responseType: 'json' }
    );
  }

  getSubCategories(categoryId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SubCategory[]>(
      this.categoryPath + '/getSubCategories',
      JSON.stringify(categoryId),
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
