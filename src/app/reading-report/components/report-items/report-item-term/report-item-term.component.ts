import {Component, Input, OnInit} from '@angular/core';
import {ReportItemTerm} from "@app/models/report-item";
import {WithReportItem} from "@app/mixins/WithReportItem";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {I18n} from "@ngx-translate/i18n-polyfill";

@Component({
  selector: 'app-report-item-term',
  templateUrl: './report-item-term.component.html',
  styleUrls: ['./report-item-term.component.css']
})
export class ReportItemTermComponent extends WithReportItem<ReportItemTerm>() implements OnInit {
  hover = false;
  @Input() item: ReportItemTerm;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      term: [this.item.term, Validators.required],
      term_definition: [this.item.term_definition, Validators.required],
    });

    this.hover = false;
  }
}
