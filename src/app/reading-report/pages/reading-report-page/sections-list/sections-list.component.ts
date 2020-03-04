import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {
  SectionEvent,
  SectionItemComponent
} from "@app/reading-report/pages/reading-report-page/section-item/section-item.component";
import {BookSectionService} from "@app/core/services/book-section.service";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.css']
})
export class SectionsListComponent extends WithLoading() implements OnInit {
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

  onSectionAdded(event: SectionEvent, ref: SectionItemComponent) {
    const addedSection$ = this.bookSectionService.add(this.userBookId, event.section);
    ref.withLoading(addedSection$).subscribe(newSection => event.parent.children.push(newSection));
  }

  onSectionUpdated(event: SectionEvent, ref: SectionItemComponent) {
    const addedSection$ = this.bookSectionService.update(event.section);
    ref.withLoading(addedSection$).subscribe((updatedSection: BookSection) => {
      updatedSection.children = event.section.children;

      if (event.parent) {
        const index = event.parent.children.findIndex(child => child.id === updatedSection.id);
        event.parent.children[index] = updatedSection;
      }
      if (event.section.id === this.content.id) {
        this.content.name = updatedSection.name;
        this.content.order = updatedSection.order;
      }

      if (event.section.id === this.activeSectionId) {
        this.selectSection(updatedSection);
      }
    });
  }

  onSectionRemoved(event: SectionEvent, ref: SectionItemComponent) {
    const deleteSection$ = this.bookSectionService.delete(event.section);
    ref.withLoading(deleteSection$).subscribe(() => {
      if (event.parent) {
        event.parent.children = event.parent.children.filter(child => child.id !== event.section.id);
        this.selectSection(event.parent);
      }
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
