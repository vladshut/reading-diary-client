import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemTerm} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-item-goal',
  templateUrl: './report-item-goal.component.html',
  styleUrls: ['./report-item-goal.component.css']
})
export class ReportItemGoalComponent extends WithReportItem(ReportItemGoal) implements OnInit {
  @Input() item: ReportItemGoal;
  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      goal: [this.item.goal, Validators.required],
      goal_result: [this.item.goal_result],
    });

    this.hover = false;
  }
}
