import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Book} from "@app/models/book";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {objectToFormData, toHttpParams} from "@app/shared/helpers/functions.helper";
import {UserBook} from "@app/models/user-book";

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

  get(userBookId: string):Observable<UserBook> {
    return this.http.get<UserBook>(this.getUrl(`my/${userBookId}`)).pipe(
      map(res => plainToClass(UserBook, res))
    );
  }
}
