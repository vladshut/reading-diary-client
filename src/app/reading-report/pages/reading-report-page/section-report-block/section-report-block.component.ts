import {Component, Input, OnInit} from '@angular/core';
import {ReportItem} from "@app/models/report-item";

@Component({
  selector: 'app-section-report-block',
  templateUrl: './section-report-block.component.html',
  styleUrls: ['./section-report-block.component.css']
})
export class SectionReportBlockComponent implements OnInit {
  @Input() name: string;
  @Input() items: ReportItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
