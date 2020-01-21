import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemRating} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-item-rating',
  templateUrl: './report-item-rating.component.html',
  styleUrls: ['./report-item-rating.component.css']
})
export class ReportItemRatingComponent extends WithReportItem(ReportItemRating) implements OnInit {
  @Input() item: ReportItemRating;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      rating: [this.item.rating, Validators.required],
    });
  }

  onRatingChanged(rating: number): void {
    this.form.setValue({rating});
    this.onUpdate();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
