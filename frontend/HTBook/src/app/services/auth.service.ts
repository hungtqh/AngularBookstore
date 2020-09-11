import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../utils/app-const';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

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

  updateProfile(user: User) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(
      this.customerPath + '/updateProfile',
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

    return this.http.get<TokenData>(
      this.userPath + '/login',
      { headers: headers, responseType: 'json' }
    ).pipe(
      tap(res => {
        const expirationDate = new Date(new Date().getTime() + res.tokenTimeout * 1000);

        localStorage.setItem('xAuthToken', res.token);
        localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
      })
    );
  }

  loginWithGoogle(authCode: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<TokenData>(
      this.userPath + '/login-google',
      authCode,
      { headers: headers, responseType: 'json' }
    ).pipe(
      tap(res => {
        if (!res) {
          throw new Error('Code is invalid!');
        }

        const expirationDate = new Date(new Date().getTime() + res.tokenTimeout * 1000);

        localStorage.setItem('xAuthToken', res.token);
        localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
      })
    );
  }

  loginWithFacebook(authCode: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<TokenData>(
      this.userPath + '/login-facebook',
      authCode,
      { headers: headers, responseType: 'json' }
    ).pipe(
      tap(res => {
        if (!res) {
          throw new Error('invalidCode');
        }

        const expirationDate = new Date(new Date().getTime() + res.tokenTimeout * 1000);

        localStorage.setItem('xAuthToken', res.token);
        localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
      })
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
        localStorage.removeItem('expirationDate');
        this.user.next(null);
      })
    );
  }

  getCurrentUser() {
    let xAuthToken = localStorage.getItem('xAuthToken');
    let expDate: Date;
    let now = new Date();

    if (xAuthToken) {
      expDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
    }

    if (expDate && expDate.getTime() < now.getTime()) {
      xAuthToken = null;
      localStorage.removeItem('xAuthToken');
      localStorage.removeItem('expirationDate');
    }

    if (!xAuthToken) {
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

export interface TokenData {
  token: string,
  tokenTimeout: number,
  hasEmail: boolean
}
