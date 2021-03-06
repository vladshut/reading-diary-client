import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemTerm} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-goal',
  templateUrl: './report-item-goal.component.html',
  styleUrls: ['./report-item-goal.component.css']
})
export class ReportItemGoalComponent extends WithReportItem(ReportItemGoal) implements OnInit {
  @Input() item: ReportItemGoal;
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
      goal: [this.item ? this.item.goal : null, Validators.required],
      goal_result: [this.item ? this.item.goal_result : null],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
