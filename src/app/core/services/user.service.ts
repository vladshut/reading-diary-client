import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '@app/models/user';
import {Observable} from 'rxjs';
import {env} from '@env/env';
import {map} from "rxjs/operators";
import {plainToClass, plainToClassFromExist} from "class-transformer";
import {Pagination} from "@app/models/pagination";
import {toHttpParams} from "@app/shared/helpers/functions.helper";

@Injectable()
export class UserService {
  private apiUrl = `${env.apiHost}/api/users`;

  constructor(private http: HttpClient) {
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      map(data => plainToClass(User, data))
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      map(data => plainToClass(User, data))
    );
  }

  completeRegistration(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/complete-registration`, {});
  }

  resendVerificationEmail(user: User): Observable<void> {
    const url = `${this.apiUrl}/${user.id}/resend-verification`;

    return this.http.get<void>(url);
  }

  list(filter: object = {}): Observable<Pagination<User>> {
    const params = toHttpParams(filter);

    const url = `${this.apiUrl}`;

    return this.http.get<Pagination<User>>(url, {params})
      .pipe(map(pagination => this.mapPagination(pagination)));
  }

  follow(userId: string): Observable<void> {
    const url = `${this.apiUrl}/${userId}/follow`;

    return this.http.post<void>(url, {});
  }

  unfollow(userId: string): Observable<void> {
    const url = `${this.apiUrl}/${userId}/unfollow`;

    return this.http.post<void>(url, {});
  }

  followeesIds(userId: string): Observable<string[]> {
    const url = `${this.apiUrl}/${userId}/followees-ids`;

    return this.http.get<string[]>(url);
  }

  followersIds(userId: string): Observable<string[]> {
    const url = `${this.apiUrl}/${userId}/followers-ids`;

    return this.http.get<string[]>(url);
  }

  followees(userId: string, filter: object): Observable<Pagination<User>> {
    const params = toHttpParams(filter);
    const url = `${this.apiUrl}/${userId}/followees`;

    return this.http.get<Pagination<User>>(url, {params})
      .pipe(map(pagination => this.mapPagination(pagination)));
  }

  followers(userId: string, filter: object): Observable<Pagination<User>> {
    const params = toHttpParams(filter);
    const url = `${this.apiUrl}/${userId}/followers`;

    return this.http.get<Pagination<User>>(url, {params})
      .pipe(map(pagination => this.mapPagination(pagination)));
  }

  private mapPagination(pagination) {
    let paginationObj = new Pagination<User>(User);
    paginationObj = plainToClassFromExist(paginationObj, pagination);

    return paginationObj;
  }
}
