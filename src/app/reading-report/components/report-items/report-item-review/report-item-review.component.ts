import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemReview} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-item-review',
  templateUrl: './report-item-review.component.html',
  styleUrls: ['./report-item-review.component.css']
})
export class ReportItemReviewComponent extends WithReportItem(ReportItemReview) implements OnInit {
  @Input() item: ReportItemReview;
  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      review: [this.item.review, Validators.required],
    });

    this.hover = false;
  }
}
