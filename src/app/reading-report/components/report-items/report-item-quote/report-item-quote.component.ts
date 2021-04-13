import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemQuote} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {AlertService} from "@app/core/services/alert.service";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-quote',
  templateUrl: './report-item-quote.component.html',
  styleUrls: ['./report-item-quote.component.css']
})
export class ReportItemQuoteComponent extends WithReportItem(ReportItemQuote) implements OnInit {
  @Input() item: ReportItemQuote;
  @Input() withActions: boolean;

  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
    protected alertService: AlertService,
    protected transl: TranslationService,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      quote: [this.item.quote, Validators.required],
      quote_note: [this.item.quote_note],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
