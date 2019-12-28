import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {toHttpParams} from "@app/shared/helpers/functions.helper";
import {plainToClass} from "class-transformer";
import {Author} from "@app/models/author";

@Injectable()
export class AuthorService extends BaseService {
  protected apiUrl = 'authors';

  search(term: string = null): Observable<Author[]> {
    const params = toHttpParams({term});

    return this.http.get(this.getUrl('search'), {params})
      .pipe(map((res: any) => {
        return plainToClass(Author, <[]>res.data);
      }));
  }

  create(author: Author): Observable<Author> {
    return this.http.post<Author>(this.getUrl(), author).pipe(
      map(data => plainToClass(Author, data))
    );
  }
}
