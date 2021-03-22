import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Book} from "@app/models/book";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {objectToFormData, toHttpParams} from "@app/shared/helpers/functions.helper";
import {UserBook} from "@app/models/user-book";
import {TopLanguage} from "@app/dashboard/models/top-language";
import {TopAuthor} from "@app/dashboard/models/top-author";
import {TopStatus} from "@app/dashboard/models/top-status";

@Injectable()
export class BookService extends BaseService {
  protected apiUrl = 'books';

  myBooks(): Observable<UserBook[]> {
    return this.http.get<UserBook[]>(this.getUrl('my')).pipe(
      map((res: any) => plainToClass(UserBook, <[]>res.data))
    );
  }

  addNew(data): Observable<UserBook> {
    const formData = objectToFormData(data);

    return this.http.post<UserBook>(this.getUrl('add-new'), formData).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  search(term: string = null): Observable<Book[]> {
    const params = toHttpParams({term});

    return this.http.get(this.getUrl('search'), {params})
      .pipe(map((res: any) => {
        return plainToClass(Book, <[]>res.data);
      }));
  }

  addExisting(data: { book_id: string }): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl('add-existing'), data).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  startReading(userBook: UserBook): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/start-reading`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  makePublic(userBook: UserBook): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/make-public`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  makePrivate(userBook: UserBook): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/make-private`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  get(userBookId: string):Observable<UserBook> {
    return this.http.get<UserBook>(this.getUrl(`user/${userBookId}`)).pipe(
      map(res => plainToClass(UserBook, res))
    );
  }

  finishReading(userBook: UserBook) {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/finish-reading`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  resumeReading(userBook: UserBook) {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/resume-reading`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  topLanguages(userId: string) {
    return this.http.get<TopLanguage[]>(this.getUrl(`users/${userId}/books/top-languages`, {}, true), {});
  }

  topAuthors(userId: string) {
    return this.http.get<TopAuthor[]>(this.getUrl(`users/${userId}/books/top-authors`, {}, true), {});
  }


  topStatuses(userId: string) {
    return this.http.get<TopStatus[]>(this.getUrl(`users/${userId}/books/top-statuses`, {}, true), {});
  }

  publish(userBook: UserBook): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/publish-report`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }

  unpublish(userBook: UserBook): Observable<UserBook> {
    return this.http.post<UserBook>(this.getUrl(`my/${userBook.id}/unpublish-report`), {}).pipe(
      map(data => plainToClass(UserBook, data))
    );
  }
}
