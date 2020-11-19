import {Component, Input, OnInit} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemFigure} from "@app/models/report-item";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";

@Component({
  selector: 'app-report-item-figure',
  templateUrl: './report-item-figure.component.html',
  styleUrls: ['./report-item-figure.component.css']
})
export class ReportItemFigureComponent extends WithReportItem(ReportItemFigure) implements OnInit {
  @Input() item: ReportItemFigure;
  hover = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
    protected alertService: AlertService,
  ) {
    super();
  }

  protected initForm(): void {
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
