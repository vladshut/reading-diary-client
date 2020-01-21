import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookSection} from "@app/models/book-section";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActionConfirmDialogComponent} from "@app/shared/components/action-confirm-dialog/action-confirm-dialog.component";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {WithLoading} from "@app/mixins/WithLoading";

export interface SectionEvent {section: BookSection, parent?: BookSection}

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.css']
})
export class SectionItemComponent extends WithLoading() implements OnInit {
  @Input() section: BookSection;
  @Input() selectedSectionId: string;
  @Output() sectionAdded = new EventEmitter<SectionEvent>();
  @Output() sectionUpdated = new EventEmitter<SectionEvent>();
  @Output() sectionRemoved = new EventEmitter<SectionEvent>();
  @Output() sectionSelected = new EventEmitter<SectionEvent>();

  editMode = false;
  addMode = false;
  editForm: FormGroup;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    this.initEditForm();
    this.initAddForm();
  }

  onEdit() {
    this.editMode = true;
  }

  onAdd() {
    this.addMode = true;
  }

  onCancelEdit() {
    this.initEditForm();
    this.editMode = false;
  }

  onSubmitEdit() {
    if (!this.editForm.valid) {
      return;
    }
    console.log(this.editForm.value.name);
    const section = new BookSection();
    section.name = this.editForm.value.name;
    section.id = this.section.id;
    section.order = this.section.order;
    section.children = this.section.children;
    this.sectionUpdated.emit({section});
    this.editMode = false;
    this.initEditForm();
  }

  private initEditForm() {
    this.editForm = this.formBuilder.group({
      name: [this.section.name, Validators.required],
    });
  }

  private initAddForm() {
    this.addForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  onSubmitAdd() {
    if (!this.addForm.valid) {
      return;
    }
    const section = new BookSection();
    section.name = this.addForm.value.name;
    section.parent_id = this.section.id;
    this.sectionAdded.emit({section: section, parent: this.section});
    this.addMode = false;
    this.initAddForm();
  }

  onCancelAdd() {
    this.initAddForm();
    this.addMode = false;
  }

  onDelete() {
    const modalRef = this.modalService.open(ActionConfirmDialogComponent, {size: 'lg'});
    modalRef.componentInstance.text = this.i18n({
      value: 'Do you really want to delete book section?',
      id: 'delete_confirmation.book_section'
    });

    modalRef.componentInstance.confirmed.subscribe(() => {
      this.sectionRemoved.emit({section: this.section});
      this.activeModal.dismiss();
    });
  }

  onSubSectionAdded(event: SectionEvent) {
    this.sectionAdded.emit(event);
  }

  onSubSectionUpdated(event: SectionEvent) {
    if (!event.parent) {
      event.parent = this.section;
      event.section.parent_id = this.section.id;
    }
    this.sectionUpdated.emit(event);
  }

  onSubSectionRemoved(event: SectionEvent) {
    if (!event.parent) {
      event.parent = this.section;
    }
    this.sectionRemoved.emit(event);
  }

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
}
