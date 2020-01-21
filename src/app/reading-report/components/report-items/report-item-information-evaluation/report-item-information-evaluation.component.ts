import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemInformationEvaluation} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-item-information-evaluation',
  templateUrl: './report-item-information-evaluation.component.html',
  styleUrls: ['./report-item-information-evaluation.component.css']
})
export class ReportItemInformationEvaluationComponent extends WithReportItem(ReportItemInformationEvaluation) implements OnInit {
  @Input() item: ReportItemInformationEvaluation;
  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      information_evaluation: [this.item.information_evaluation, Validators.required],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
