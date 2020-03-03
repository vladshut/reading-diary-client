import { Component, OnInit } from '@angular/core';
import {UserBook} from "@app/models/user-book";
import {BookSection} from "@app/models/book-section";
import {BookSectionService} from "@app/core/services/book-section.service";
import {ActivatedRoute} from "@angular/router";
import {WithLoading} from "@app/mixins/WithLoading";
import {PublicReportService} from "@app/core/services/public-report.service";

@Component({
  selector: 'app-public-report-page',
  templateUrl: './public-report-page.component.html',
  styleUrls: ['./public-report-page.component.css']
})
export class PublicReportPageComponent extends WithLoading() implements OnInit {
  deep = 0;
  userBookReportPublicKey: string;
  userBook: UserBook;
  section: BookSection;

  constructor(
    private publicReportService: PublicReportService,
    private sectionService: BookSectionService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.userBookReportPublicKey = this.route.snapshot.paramMap.get('publicKey');

    const book$ = this.publicReportService.getByPublicKey(this.userBookReportPublicKey);
    this.withLoading(book$).subscribe(ub => {
      this.userBook = ub;

      const section$ = this.publicReportService.getSections(this.userBookReportPublicKey);

      this.withLoading(section$).subscribe(section => {
        this.section = section;
      });
    });
  }
}
