import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@app/models/user';
import { Observable } from 'rxjs';
import { env } from '@env/env';

@Injectable()
export class UserService {
    private apiUrl = `${env.apiHost}/api/users`;

    constructor(private http: HttpClient) { }

    register(email, password, name, agreementConfirmed, extraParams?): Observable<User> {
        const params = {...extraParams};
        params['email'] = email;
        params['password'] = password;
        params['name'] = name;
        params['agreementConfirmed'] = agreementConfirmed ? '1' : '0';
        return this.http.post<User>(`${this.apiUrl}/register`, params);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    completeRegistration(): Observable<void>{
        return this.http.post<void>(`${this.apiUrl}/complete-registration`, {});
    }
}
