import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-report-item-actions',
  templateUrl: './report-item-actions.component.html',
  styleUrls: ['./report-item-actions.component.css']
})
export class ReportItemActionsComponent implements OnInit {
  MOVE = 'move';
  DELETE = 'delete';
  COPY = 'copy';
  PRIVACY = 'privacy';
  FAVORITE = 'favorite';

  @Input() visible = false;
  @Input() isPublic = true;
  @Input() isSingle = false;
  @Input() isFavorite = false;
  @Input() except = [];
  @Input() with = [this.MOVE, this.DELETE, this.COPY, this.PRIVACY, this.FAVORITE];

  @Output() delete = new EventEmitter();
  @Output() copy = new EventEmitter();
  @Output() switchVisibility = new EventEmitter();
  @Output() switchFavorite = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hasAction(action: string): boolean {
    return this.except.indexOf(action) === -1 && this.with.indexOf(action) !== -1;
  }
}
