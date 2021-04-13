import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemResume} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {AlertService} from "@app/core/services/alert.service";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-resume',
  templateUrl: './report-item-resume.component.html',
  styleUrls: ['./report-item-resume.component.css']
})
export class ReportItemResumeComponent extends WithReportItem(ReportItemResume) implements OnInit {
  @Input() item: ReportItemResume;
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
      resume: [this.item.resume, Validators.required],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
