import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookService} from "@app/core/services/book.service";
import {finalize} from "rxjs/operators";
import {UserBook} from "@app/models/user-book";
import {UserBookItemComponent} from "@app/books/component/user-book-item/user-book-item.component";
import {WithLoading} from "@app/mixins/WithLoading";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent extends WithLoading() implements OnInit {
  books = [];

  constructor(
    private bookService: BookService,
    protected cdr: ChangeDetectorRef,
    private router: Router,
  ){
    super();
  }

  ngOnInit() {
    const myBooks$ = this.bookService.myBooks();

    this.withLoading(myBooks$)
      .subscribe(
        books => this.books = books,
        errors => console.log('Errors: ', errors)
      );
  }

  startReading(userBook: UserBook, ref: UserBookItemComponent): void {
    const startReading$ = this.bookService.startReading(userBook);
    ref.withLoading(startReading$).subscribe(ub => this.navigateToUserBookReport(ub));
  }

  continueReading(userBook: UserBook) {
    this.navigateToUserBookReport(userBook);
  }

  private navigateToUserBookReport(ub: UserBook): void {
    this.router.navigate([`/reading-report/${ub.id}`]);
  }
}
