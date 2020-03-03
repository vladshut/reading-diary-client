import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {ReportItem} from "@app/models/report-item";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {classToPlain, plainToClass} from "class-transformer";
import {SectionReport} from "@app/models/report";

@Injectable()
export class ReportService extends BaseService {
  protected apiUrl = 'books/my/sections/:bookSectionId/report-items';

  protected storedSectionReports: SectionReport[] = [];

  getReportForSection(bookSectionId: string): Observable<SectionReport> {
    const storedReport = this.findStoredReportBySectionId(bookSectionId);

    if (storedReport) {
      return of(storedReport);
    }

    return this.http.get<ReportItem[]>(this.getUrl('', {bookSectionId})).pipe(
      map(items => plainToClass(SectionReport, {items, bookSectionId})),
      tap(report => this.addStoredReport(report))
    );
  }

  saveReportItemsForSection(bookSectionId: string | SectionReport): Observable<SectionReport> {
    let storedReport;
    console.log(bookSectionId);

    if (typeof bookSectionId === 'string' || typeof bookSectionId === 'number') {
      storedReport = this.findStoredReportBySectionId(bookSectionId);
    } else {
      storedReport = bookSectionId;
      this.addStoredReport(storedReport)
    }

    if (!storedReport) {
      return of(plainToClass(SectionReport, {items: [], bookSectionId}));
    }

    const itemsToUpdate = storedReport.getItemsToUpdate();
    const itemsToDelete = storedReport.getItemsToDelete().filter(i => !!i.id);

    if (itemsToUpdate.length < 1 && itemsToDelete.length < 1) {
      return of(storedReport);
    }

    const data = {updatedItems: classToPlain(itemsToUpdate), deletedItems: itemsToDelete.map(i => i.id)};

    return this.http.post(this.getUrl('save-book-section-report', {bookSectionId: storedReport.bookSectionId}), data)
      .pipe(
        map(items => {
          return storedReport;
        }),
        tap(report => {
          report.clearDeletedItems();
          itemsToUpdate.forEach(i => i.markAsUpdated());
        }),
      );
  }

  private findStoredReportBySectionId(bookSectionId: string): SectionReport | undefined {
    return this.storedSectionReports.find(el => el.bookSectionId === bookSectionId);
  }

  private addStoredReport(report: SectionReport) {
    const existedIndex = this.storedSectionReports.findIndex(el => el.bookSectionId === report.bookSectionId);

    if (existedIndex === -1) {
      this.storedSectionReports.push(report);
    } else {
      this.storedSectionReports[existedIndex] = report;
    }
  }
}
