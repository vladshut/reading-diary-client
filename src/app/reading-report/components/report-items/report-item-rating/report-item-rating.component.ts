import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemGoal, ReportItemRating} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "@app/core/services/auth.service";
import {AlertService} from "@app/core/services/alert.service";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-rating',
  templateUrl: './report-item-rating.component.html',
  styleUrls: ['./report-item-rating.component.css']
})
export class ReportItemRatingComponent extends WithReportItem(ReportItemRating) implements OnInit {
  @Input() item: ReportItemRating;
  @Input() withActions: boolean;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
    public auth: AuthService,
    protected alertService: AlertService,
    protected transl: TranslationService,
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
