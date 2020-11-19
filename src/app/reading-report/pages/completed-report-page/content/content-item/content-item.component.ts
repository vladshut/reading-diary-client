import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {SectionEvent} from "@app/reading-report/pages/reading-report-page/section-item/section-item.component";

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent {

  @Input() section: BookSection;
  @Input() selectedSectionId: string;
  @Output() sectionSelected = new EventEmitter<SectionEvent>();

  onSubSectionSelected(event: SectionEvent) {
    if (!event.parent) {
      event.parent = this.section;
    }
    this.sectionSelected.emit(event);
  }

  onSelect() {
    this.sectionSelected.emit({section: this.section});
  }

  isSelected(): boolean {
    return this.section.id === this.selectedSectionId;
  }

  childrenSortBy(prop: string) {
    return this.section.children.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
}
