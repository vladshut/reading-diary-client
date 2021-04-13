import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookService} from "@app/core/services/book.service";
import {UserBook} from "@app/models/user-book";
import {UserBookItemComponent} from "@app/books/component/user-book-item/user-book-item.component";
import {WithLoading} from "@app/mixins/WithLoading";
import {Router} from "@angular/router";
import {Pagination} from "@app/models/pagination";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";
import {Dictionary} from "@app/models/dictionary";

interface Filter {
  query?: string,
  page: number,
  per_page: number,
  statuses?: Array<string>,
  order_by: string,
  order_dir: string,
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent extends WithLoading() implements OnInit {
  minQueryLength = 3;
  pagination: Pagination<UserBook>;
  statusesDict = [];
  sortOptions = [];
  filter: Filter = {page: 1, per_page: 20, statuses: [], order_by: 'updated_at', order_dir: 'desc'};
  viewType: string = 'grid';

  constructor(
    private bookService: BookService,
    protected cdr: ChangeDetectorRef,
    private router: Router,
    private i18n: I18n,
    private trans: TranslationService,
  ){
    super();
    this.statusesDict = UserBook.getStatusesAsOptions(trans);
    this.sortOptions = [
      new Dictionary('updated_at:asc', i18n({id: 'sort.updated_at.asc', value: 'Modified ASC'})),
      new Dictionary('updated_at:desc', i18n({id: 'sort.updated_at.desc', value: 'Modified DESC'})),
      new Dictionary('created_at:desc', i18n({id: 'sort.created_at.desc', value: 'Created DESC'})),
      new Dictionary('created_at:asc', i18n({id: 'sort.created_at.asc', value: 'Created ASC'})),
    ];
  }

  ngOnInit() {
    this.loadItems();
  }

  startReading(userBook: UserBook, ref?: UserBookItemComponent): void {
    const startReading$ = this.bookService.startReading(userBook);
    (ref || this).withLoading(startReading$).subscribe(ub => this.navigateToUserBookReport(ub));
  }

  continueReading(userBook: UserBook) {
    this.navigateToUserBookReport(userBook);
  }

  onViewReport(ub: UserBook) {
    this.router.navigate([`/reading-report/completed/${ub.id}`]);
  }

  onSearch(query: string) {
    this.filter.query = query;
    this.loadItems();
  }

  onResetSearch() {
    delete this.filter.query;
    this.loadItems();
  }

  goToPage(page: number) {
    this.filter.page = page;
    this.loadItems();
  }

  private loadItems() {
    const $items = this.bookService.myBooks(this.filter);
    this.withLoading($items).subscribe(pagination => this.pagination = pagination);
  }

  private navigateToUserBookReport(ub: UserBook): void {
    this.router.navigate([`/reading-report/${ub.id}`]);
  }

  onStatusChange($e) {
    const isChecked = $e.target.checked;
    const status = $e.target.value;
    const statusIndex = this.filter.statuses.indexOf(status);

    if (isChecked && statusIndex === -1) {
      this.filter.statuses.push(status);
    } else if (!isChecked && statusIndex !== -1) {
      delete this.filter.statuses[statusIndex];
    }

    this.loadItems();
  }

  onSortSelect($e) {
    const value = $e.target.value;
    const valueParts = value.split(':', 2);

    this.filter.order_by = valueParts[0];
    this.filter.order_dir = valueParts[1];

    this.loadItems();
  }
}
