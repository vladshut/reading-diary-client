import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {WithLoading} from "@app/mixins/WithLoading";
import {ReportItem, ReportItemType} from "@app/models/report-item";
import {interval, Observable, Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import {ReportService} from "@app/core/services/report.service";
import { Moment } from 'moment';
import * as moment from 'moment';
import {CanComponentDeactivate} from "@app/core/guards/can-deactivate.guard";

@Component({
  selector: 'app-completed-report-section-item',
  templateUrl: './completed-report-section-item.component.html',
  styleUrls: ['./completed-report-section-item.component.css']
})
export class CompletedReportSectionItemComponent extends WithLoading() implements OnInit, OnDestroy, CanComponentDeactivate {
  @Input() section: BookSection;
  @Input() withActions: boolean;
  @Input() deep = 0;

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
    this.typesWithNames = ReportItem.getTypesWithInfo();
    this.timeToSaveSubscription = this.saveInterval.subscribe(val => this.saveReport());
  }

  ngOnDestroy(): void {
    this.timeToSaveSubscription.unsubscribe();
    this.saveReport();
  }

  onCreate(type: ReportItemType) {
    this.section.report.createItem(type);
  }

  createReportItem(type: ReportItemType) {
    this.section.report.createItem(type);
  }


  private saveReport() {
    if (this.isSaving || !this.section.report.isNeededToBeSaved()) {
      return;
    }

    this.isSaving = true;

    this.reportService.saveReportItemsForSection(this.section.report)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(
        report => {
          this.section.report = report;
          this.savedTime = moment();
        }
      );
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.saveReport();

    return true;
  }
}
