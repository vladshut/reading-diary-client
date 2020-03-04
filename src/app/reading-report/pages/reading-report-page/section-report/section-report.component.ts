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
import {BookService} from "@app/core/services/book.service";
import {Router} from "@angular/router";
import {ActionConfirmDialogComponent} from "@app/shared/components/action-confirm-dialog/action-confirm-dialog.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

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

  createReportItemsHotkeys: {combo: string, type: ReportItemType}[] = [];

  constructor(
    private reportService: ReportService,
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private hotkeysService: HotkeysService,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    this.typesWithNames = ReportItem.getTypesWithInfo();

    let i = 1;
    this.typesWithNames.forEach(t => {
      this.createReportItemsHotkeys.push({combo: 'meta+shift+' + i, type: t.type});
      i++;
    });

    this.createReportItemsHotkeys.forEach(h =>
      this.hotkeysService.add(new Hotkey(h.combo, (event: KeyboardEvent): boolean => {
        this.createReportItem(h.type);
        return false; // Prevent bubbling
      })));

    this.hotkeysService.add(new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
      console.log('Typed hotkey');
      return false; // Prevent bubbling
    }));

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

  onCompleteReading() {
    const modalRef = this.modalService.open(ActionConfirmDialogComponent, {size: 'lg'});
    modalRef.componentInstance.text = this.i18n({
      value: 'Do you really want to complete this book?',
      id: 'finish_reading_confirmation'
    });

    modalRef.componentInstance.confirmed.subscribe(() => {
      const finishReading$ = this.bookService.finishReading(this.userBook);
      this.withLoading(finishReading$).subscribe(ub => this.navigateToBooksList());
    });
  }


  private navigateToBooksList() {
    this.router.navigate([`/books/list`]);
  }
}
