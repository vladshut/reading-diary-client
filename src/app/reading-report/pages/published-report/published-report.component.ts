import {Component, Input, OnInit} from '@angular/core';
import {UserBook} from "@app/models/user-book";
import {BookSection} from "@app/models/book-section";
import {BookSectionService} from "@app/core/services/book-section.service";
import {ActivatedRoute} from "@angular/router";
import {WithLoading} from "@app/mixins/WithLoading";
import {BookService} from "@app/core/services/book.service";
import {AuthService} from "@app/core/services/auth.service";

@Component({
  selector: 'app-published-report',
  templateUrl: './published-report.component.html',
  styleUrls: ['./published-report.component.css']
})
export class PublishedReportComponent extends WithLoading() implements OnInit {
  deep = 0;
  userBookId: string;
  userBook: UserBook;
  section: BookSection;
  userId: string;

  constructor(
    private userBookService: BookService,
    private sectionService: BookSectionService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.userId = this.auth.getUser().id;
    this.userBookId = this.userBookId = this.route.snapshot.paramMap.get('userBookId');

    const book$ = this.userBookService.get(this.userBookId);
    this.withLoading(book$).subscribe(ub => {
      this.userBook = ub;

      const section$ = this.sectionService.list(this.userBookId);

      this.withLoading(section$).subscribe(section => {
        this.section = section;
      });
    });
  }
}
