import { Component, OnInit } from '@angular/core';
import {BookService} from "@app/core/services/book.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {AuthService} from "@app/core/services/auth.service";
import {TopAuthor} from "@app/dashboard/models/top-author";

@Component({
  selector: 'app-top-authors',
  templateUrl: './top-authors.component.html',
  styleUrls: ['./top-authors.component.css']
})
export class TopAuthorsComponent extends WithLoading() implements OnInit {

  stats: TopAuthor[];
  badgeTypes = ['primary', 'info', 'warning', 'success', 'secondary', 'danger'];

  constructor(
    private bookService: BookService,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {

    const stats = this.bookService.topAuthors(this.auth.getUser().id);

    this.withLoading(stats).subscribe((result: TopAuthor[]) => {
      this.stats = result;
    });
  }

}
