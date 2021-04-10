import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemForwardResearch, ReportItemTerm} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-item-forward-research',
  templateUrl: './report-item-forward-research.component.html',
  styleUrls: ['./report-item-forward-research.component.css']
})
export class ReportItemForwardResearchComponent extends WithReportItem(ReportItemForwardResearch) implements OnInit {
  @Input() item: ReportItemForwardResearch;
  @Input() withActions: boolean;

  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      forward_research: [this.item.forward_research, Validators.required],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
