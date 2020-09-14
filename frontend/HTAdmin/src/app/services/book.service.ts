import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { AppConst } from '../utils/app-const';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookPath = AppConst.serverPath + '/book';
  constructor(private http: HttpClient) { }

  addBook(book: Book) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.bookPath + '/addBook',
      JSON.stringify(book),
      { headers: headers, responseType: 'text' }
    );
  }

  updateBook(book: Book) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.bookPath + '/updateBook',
      JSON.stringify(book),
      { headers: headers, responseType: 'text' }
    );
  }

  getAllBook() {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get<Book[]>(
      this.bookPath + '/getAllBook',
      { headers: headers, responseType: 'json' }
    );
  }

  getBookById(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post<Book>(
      this.bookPath + '/getBookById',
      JSON.stringify(id),
      { headers: headers, responseType: 'json' }
    );
  }
}
