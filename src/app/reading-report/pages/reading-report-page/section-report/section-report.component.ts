import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {ReportItem, ReportItemType} from "@app/models/report-item";
import {ReportService} from "@app/core/services/report.service";
import {Report, SectionReport} from "@app/models/report";
import {interval, Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import { Moment } from 'moment';
import * as moment from 'moment';
import {WithLoading} from "@app/mixins/WithLoading";
import {UserBook} from "@app/models/user-book";

@Component({
  selector: 'app-section-report',
  templateUrl: './section-report.component.html',
  styleUrls: ['./section-report.component.css']
})
export class SectionReportComponent extends WithLoading() implements OnInit, OnDestroy {
  @Input() userBook: UserBook;
  _section: BookSection;
  report: SectionReport;
  isFabActive: boolean = false;
  typesWithNames = [];
  private timeToSaveSubscription: Subscription;
  private saveInterval = interval(10000);
  isSaving = false;
  savedTime: Moment;

  constructor(
    private reportService: ReportService,
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.userBook);
    this.typesWithNames = ReportItem.getTypesWithInfo();

    this.timeToSaveSubscription = this.saveInterval.subscribe(val => this.saveReport());
  }

  @Input()
  set section(section: BookSection) {
    if (!section) {
      return;
    }

    this._section = section;
    const report$ = this.reportService.getReportForSection(this._section.id);
    this.withLoading(report$).subscribe(report => this.report = report);
  }

  createReportItem(type: ReportItemType) {
    this.report.createItem(type);
  }

  ngOnDestroy(): void {
    this.timeToSaveSubscription.unsubscribe();
    this.saveReport();
  }

  private saveReport() {
    if (this.isSaving || !this.report.isNeededToBeSaved()) {
      return;
    }

    this.isSaving = true;

    this.reportService.saveReportItemsForSection(this._section.id)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
      report => {
        this.report = report;
        this.savedTime = moment();
      }
    );
  }

  onCreate(type: ReportItemType) {
    this.report.createItem(type);
  }
}
