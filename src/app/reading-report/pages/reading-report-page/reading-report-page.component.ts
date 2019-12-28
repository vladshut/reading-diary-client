import { Component, OnInit } from '@angular/core';
import {BookSectionService} from "@app/core/services/book-section.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {ActivatedRoute} from "@angular/router";
import {BookSection} from "@app/models/book-section";

@Component({
  selector: 'app-reading-report-page',
  templateUrl: './reading-report-page.component.html',
  styleUrls: ['./reading-report-page.component.css']
})
export class ReadingReportPageComponent extends WithLoading() implements OnInit {
  userBookId: string;
  selectedSection: BookSection;

  constructor(
    private bookSectionService: BookSectionService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.userBookId = this.route.snapshot.paramMap.get('userBookId');
  }

  onSectionSelected(section: BookSection) {
    console.log(section);
    this.selectedSection = section;
  }
}
