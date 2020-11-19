import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {BookSectionService} from "@app/core/services/book-section.service";
import {
  SectionEvent,
  SectionItemComponent
} from "@app/reading-report/pages/reading-report-page/section-item/section-item.component";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent extends WithLoading() implements OnInit {

  @Input() userBookId: string;

  @Output() sectionSelected = new EventEmitter<BookSection>();

  content: BookSection;
  activeSectionId: string;

  constructor(
    private bookSectionService: BookSectionService,
  ) {
    super();
  }

  ngOnInit() {
    const content$ = this.bookSectionService.list(this.userBookId);
    this.withLoading(content$).subscribe(content => {
      this.content = content;
      this.selectSection(content);
    });
  }

  onSectionSelected(event: SectionEvent, ref: SectionItemComponent) {
    this.selectSection(event.section);
  }

  selectSection(section: BookSection) {
    this.activeSectionId = section.id;
    this.sectionSelected.emit(section);
  }
}
