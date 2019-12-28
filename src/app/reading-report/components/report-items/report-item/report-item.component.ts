import {Component, Input, OnInit} from '@angular/core';
import {ReportItem} from "@app/models/report-item";

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {
  @Input() item: ReportItem;

  constructor() { }

  ngOnInit() {
  }

}
