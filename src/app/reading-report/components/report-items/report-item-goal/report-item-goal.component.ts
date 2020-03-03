import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemTerm} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";

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
    protected alertService: AlertService,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      goal: [this.item ? this.item.goal : null, Validators.required],
      goal_result: [this.item ? this.item.goal_result : null],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
