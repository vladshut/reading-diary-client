import { Component, OnInit } from '@angular/core';
import {BookService} from "@app/core/services/book.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {AuthService} from "@app/core/services/auth.service";
import {TopStatus} from "../../models/top-status";
import {I18n} from "@ngx-translate/i18n-polyfill";
import { UserBook } from '@app/models/user-book';

@Component({
  selector: 'app-top-statuses',
  templateUrl: './top-statuses.component.html',
  styleUrls: ['./top-statuses.component.css']
})
export class TopStatusesComponent extends WithLoading() implements OnInit {

  stats: TopStatus[];
  badgeTypes = ['primary', 'info', 'warning', 'success', 'secondary', 'danger'];
  statusName;

  constructor(
    private bookService: BookService,
    private auth: AuthService,
    private i18n: I18n,
  ) {
    super();
    this.statusName = {
      'not_read': i18n({id: 'book_status.not_read', value: 'Not read'}),
      'read': i18n({id: 'book_status.read', value: 'Completed'}),
      'reading': i18n({id: 'book_status.reading', value: 'In progress'}),
      'canceled': i18n({id: 'book_status.reading', value: 'Interrupted'}),
    };
  }

  ngOnInit() {

    const stats = this.bookService.topStatuses(this.auth.getUser().id);

    this.withLoading(stats).subscribe((result: TopStatus[]) => {
      this.stats = result;
    });
  }

}
