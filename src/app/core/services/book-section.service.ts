import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BookSection} from "@app/models/book-section";
import {createDataTree} from "@app/shared/helpers/functions.helper";

@Injectable()
export class BookSectionService extends BaseService {
  protected apiUrl = 'books/my/:userBookId/sections/:sectionId';

  content(userBookId: string): Observable<BookSection> {
    return this.http.get<BookSection>(this.getUrl('', {userBookId})).pipe(
      map((res: any) => {
        let sections = plainToClass(BookSection, <[]>res);
        console.log(sections, res);
        sections = createDataTree(sections);

        return sections.length > 0 ? sections[0] : undefined;
      }
    ));
  }

  add(userBookId: string, section: BookSection): Observable<BookSection> {
    const payload = {
      name: section.name,
      parent_id: section.parent_id,
    };

    return this.http.post<BookSection>(this.getUrl('', {userBookId}), payload).pipe(
      map(data => plainToClass(BookSection, data))
    );
  }

  update(section: BookSection): Observable<BookSection> {
    const payload = {
      name: section.name,
      order: section.order,
    };

    return this.http.put<BookSection>(this.getUrl('', {sectionId: section.id}), payload).pipe(
      map(data => plainToClass(BookSection, data))
    );
  }

  delete(section: BookSection): Observable<void> {
    return this.http.delete<void>(this.getUrl('', {sectionId: section.id}));
  }
}
