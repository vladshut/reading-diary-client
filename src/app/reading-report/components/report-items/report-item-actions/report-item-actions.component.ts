import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-report-item-actions',
  templateUrl: './report-item-actions.component.html',
  styleUrls: ['./report-item-actions.component.css']
})
export class ReportItemActionsComponent implements OnInit {
  @Input() visible = false;
  @Input() isPublic = true;

  @Output() delete = new EventEmitter();
  @Output() copy = new EventEmitter();
  @Output() switchVisibility = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
