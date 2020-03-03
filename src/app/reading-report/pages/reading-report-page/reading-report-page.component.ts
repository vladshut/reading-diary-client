import { Component, OnInit } from '@angular/core';
import {BookSectionService} from "@app/core/services/book-section.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {ActivatedRoute} from "@angular/router";
import {BookSection} from "@app/models/book-section";
import {BookService} from "@app/core/services/book.service";
import {UserBook} from "@app/models/user-book";

@Component({
  selector: 'app-reading-report-page',
  templateUrl: './reading-report-page.component.html',
  styleUrls: ['./reading-report-page.component.css']
})
export class ReadingReportPageComponent extends WithLoading() implements OnInit {
  userBook: UserBook;
  userBookId: string;
  selectedSection: BookSection;

  constructor(
    private bookService: BookService,
    private bookSectionService: BookSectionService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.userBookId = this.route.snapshot.paramMap.get('userBookId');

    const book$ = this.bookService.get(this.userBookId);
    this.withLoading(book$).subscribe(ub => {
      this.userBook = ub;
    });
  }

  onSectionSelected(section: BookSection) {
    this.selectedSection = section;
  }
}
