import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {ReportItem, ReportItemType} from "@app/models/report-item";
import {ReportService} from "@app/core/services/report.service";
import {Report, SectionReport} from "@app/models/report";
import {interval, Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-section-report',
  templateUrl: './section-report.component.html',
  styleUrls: ['./section-report.component.css']
})
export class SectionReportComponent implements OnInit, OnDestroy {
  _section: BookSection;
  report: SectionReport;
  isFabActive: boolean = true;
  typesWithNames = [];
  private timeToSaveSubscription: Subscription;
  private saveInterval = interval(10000);
  isSaving = false;
  savedTime: Moment;

  constructor(
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    this.typesWithNames = ReportItem.getTypesWithNames();

    this.timeToSaveSubscription = this.saveInterval.subscribe(val => this.saveReport());
  }

  @Input()
  set section(section: BookSection) {
    if (!section) {
      return;
    }

    this._section = section;
    this.reportService.getReportForSection(section.id).subscribe(
      report => this.report = report
    );
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
}
