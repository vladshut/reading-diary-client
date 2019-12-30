import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportItem, ReportItemType} from "@app/models/report-item";

@Component({
  selector: 'app-section-report-block',
  templateUrl: './section-report-block.component.html',
  styleUrls: ['./section-report-block.component.css']
})
export class SectionReportBlockComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Input() items: ReportItem[] = [];
  @Input() isSingle: boolean = false;

  @Output() createItem = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onCreate() {
    this.createItem.emit();
  }
}
