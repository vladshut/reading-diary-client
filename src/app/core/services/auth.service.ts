import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '@env/env';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { getCircularReplacer } from '@app/shared/helpers/functions.helper';
import {map, tap, switchMap} from "rxjs/operators";

const CURRENT_USER_KEY = 'rd_current_user';
const TOKEN_KEY = 'rd_access_token_key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserUpdated = new EventEmitter<User>();
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
  ) {}

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  register(email, password, extraParams?): Observable<User> {
    const params = {...extraParams};
    params['email'] = email;
    params['password'] = password;

    return this.http
      .post(`${env.apiHost}/api/auth/register`, params, {headers: this.headers})
      .pipe(switchMap((data: {access_token: string}) => this.loginWithToken(data.access_token)));
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): User {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);

    if (!userJson) {
      return undefined;
    }

    return plainToClass(User, [JSON.parse(userJson)])[0];
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user, getCircularReplacer()));
    this.currentUserUpdated.emit(user);
  }

  isAuthenticated(): boolean {
    return this.getToken() && !this.jwtHelper.isTokenExpired(this.getToken());
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post(`${env.apiHost}/api/auth/login`, {email, password}, {headers: this.headers})
      .pipe(switchMap((data: {access_token: string}) => this.loginWithToken(data.access_token)));
  }

  autologin(alogin: string): Promise<User> {
    return this.http
      .post(`${env.apiHost}/api/auto_login`, {alogin}, {headers: this.headers})
      .toPromise()
      .then((user: User) => {
        this.setCurrentUser(user);
        return user;
      });
  }

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  sendResetPasswordEmail(email: string): Observable<void> {
    const url = `${env.apiHost}/api/auth/send-reset-password-mail`;
    const body = {email};
    const options = {headers: this.headers};

    return this.http.post<void>(url, body, options);
  }

  resetPassword(password: string, token: string, email: string) {
    const url = `${env.apiHost}/api/auth/reset-password`;
    const body = {password, token, email};
    const options = {headers: this.headers};

    return this.http.post<void>(url, body, options);
  }

  loginWith(method: string): Observable<{redirect_to: string}> {
    return this.http.get<{redirect_to: string}>(`${env.apiHost}/api/auth/login/socialite/${method}`);
  }

  loginWithToken(token: string): Observable<User> {
    localStorage.setItem(TOKEN_KEY, token);

    return this.http.post<User>(`${env.apiHost}/api/auth/me`, {})
      .pipe(map(user => plainToClass(User, user)))
      .pipe(tap((user: User) => this.setCurrentUser(user)));
  }

  me(): Observable<User> {
    return this.http.post<User>(`${env.apiHost}/api/auth/me`, {})
      .pipe(map(user => plainToClass(User, user)))
      .pipe(tap((user: User) => this.setCurrentUser(user)));
  }

  changePassword(oldPassword: string|null, newPassword: string, confirmPassword: string): Observable<void> {
    const data = {
      'new_password': newPassword,
      'confirm_password': confirmPassword,
    };

    if (oldPassword) {
      data['old_password'] = oldPassword;
    }

    return this.http.post<void>(`${env.apiHost}/api/auth/change-password`, data);
  }

  verifyEmail(link: string): Observable<void> {
    return this.http.get<void>(link);
  }
}
