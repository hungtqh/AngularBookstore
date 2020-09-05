import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { AppConst } from '../utils/app-const';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private customerPath: string = AppConst.serverPath + '/customer';
  private userPath: string = AppConst.serverPath + '/user';

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  register(user: User) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(
      this.customerPath + '/register',
      JSON.stringify(user),
      { headers: headers, responseType: 'text' }
    );
  }

  login(username: string, password: string) {
    let encodedCredentials = btoa(username + ":" + password);
    let basicHeader = "Basic " + encodedCredentials;

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });

    return this.http.get<{ 'token': 'value' }>(
      this.userPath + '/login',
      { headers: headers, responseType: 'json' }
    ).pipe(
      tap(res => {
        localStorage.setItem("xAuthToken", res.token);
      })
    );
  }

  checkSession() {

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(
      this.userPath + '/checkSession',
      { headers: headers, responseType: 'text' }
    );
  }

  logout() {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(
      this.userPath + '/logout',
      { headers: headers, responseType: 'text' }
    ).pipe(
      tap(res => {
        localStorage.removeItem('xAuthToken');
        this.user.next(null);
      })
    );
  }

  getCurrentUser() {
    let xAuthToken = localStorage.getItem('xAuthToken');

    if (xAuthToken === null) {
      return new Observable<User>(observer => {
        setInterval(() => {
          observer.next(null);
          observer.unsubscribe();
        }, 1)
      })
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xAuthToken
    });

    return this.http.get<User>(
      this.userPath + '/getCurrentUser',
      { headers: headers, responseType: 'json' }
    ).pipe(
      tap(res => {
        this.user.next(res);
        console.log(res);
      })
    );
  }
}
