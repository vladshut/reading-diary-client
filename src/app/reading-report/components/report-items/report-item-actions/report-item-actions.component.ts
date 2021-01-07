import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorFormModalComponent} from "@app/authors/modals/author-form-modal/author-form-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageModalComponent} from "@app/shared/components/image-modal/image-modal.component";

@Component({
  selector: 'app-report-item-actions',
  templateUrl: './report-item-actions.component.html',
  styleUrls: ['./report-item-actions.component.css']
})
export class ReportItemActionsComponent implements OnInit {
  MOVE = 'move';
  DELETE = 'delete';
  COPY = 'copy';
  PRIVACY = 'privacy';
  FAVORITE = 'favorite';
  IMAGE_PREVIEW = 'image_preview';

  @Input() visible = false;
  @Input() isPublic = true;
  @Input() isSingle = false;
  @Input() isFavorite = false;
  @Input() imgSrc: string;
  @Input() except = [];
  @Input() with = [this.MOVE, this.DELETE, this.COPY, this.PRIVACY, this.FAVORITE];

  @Output() delete = new EventEmitter();
  @Output() copy = new EventEmitter();
  @Output() switchVisibility = new EventEmitter();
  @Output() switchFavorite = new EventEmitter();

  constructor(
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    if (this.imgSrc) {
      this.with.push(this.IMAGE_PREVIEW);
    }
  }

  hasAction(action: string): boolean {
    return this.except.indexOf(action) === -1 && this.with.indexOf(action) !== -1;
  }

  imagePreview() {
    const modalRef = this.modal.open(ImageModalComponent, {size: 'lg'});

    const component = <ImageModalComponent>modalRef.componentInstance;

    component.src = this.imgSrc;
  }
}
