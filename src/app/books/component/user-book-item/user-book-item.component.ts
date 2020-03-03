import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBook} from "@app/models/user-book";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-user-book-item',
  templateUrl: './user-book-item.component.html',
  styleUrls: ['./user-book-item.component.css']
})
export class UserBookItemComponent extends WithLoading() implements OnInit {
  @Input() userBook: UserBook;
  @Output() startReading = new EventEmitter<UserBook>();
  @Output() continueReading = new EventEmitter<UserBook>();
  @Output() viewReport = new EventEmitter<UserBook>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onStartReading() {
    this.startReading.emit(this.userBook);
  }

  onContinueReading() {
    this.continueReading.emit(this.userBook);
  }

  onViewReport() {
    this.viewReport.emit(this.userBook);
  }
}
