import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemReview} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-review',
  templateUrl: './report-item-review.component.html',
  styleUrls: ['./report-item-review.component.css']
})
export class ReportItemReviewComponent extends WithReportItem(ReportItemReview) implements OnInit {
  @Input() item: ReportItemReview;
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
      review: [this.item.review, Validators.required],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
