import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '@app/models/user';
import {Observable} from 'rxjs';
import {env} from '@env/env';
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BookSection} from "@app/models/book-section";

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

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  completeRegistration(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/complete-registration`, {});
  }

  resendVerificationEmail(user: User): Observable<void> {
    const url = `${this.apiUrl}/${user.id}/resend-verification`;

    return this.http.get<void>(url);
  }
}
