import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {ReportItem} from "@app/models/report-item";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {classToPlain, plainToClass} from "class-transformer";
import {SectionReport} from "@app/models/report";
import {UserBook} from "@app/models/user-book";
import {BookSection} from "@app/models/book-section";
import {createDataTree} from "@app/shared/helpers/functions.helper";

@Injectable()
export class PublicReportService extends BaseService {
  protected apiUrl = 'public-report/:publicKey';

  getByPublicKey(publicKey: string) {
    return this.http.get<UserBook>(this.getUrl(``, {publicKey})).pipe(
      map(res => plainToClass(UserBook, res))
    );
  }

  getSections(publicKey: string): Observable<BookSection> {
    return this.http.get<BookSection>(this.getUrl('sections', {publicKey})).pipe(
      map((res: any) => {
          res.forEach(s => s.report = plainToClass(SectionReport, {items: s.reportItems, bookSectionId: s.id}));

          let sections = plainToClass(BookSection, <[]>res);

          sections = createDataTree(sections);

          return sections.length > 0 ? sections[0] : undefined;
        }
      ));
  }
}
