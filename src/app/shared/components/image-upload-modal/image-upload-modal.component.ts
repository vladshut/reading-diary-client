import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";
import {getFilepondOptions, getInputValueByName, uuid4} from "@app/shared/helpers/functions.helper";

@Component({
  selector: 'app-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.css']
})
export class ImageUploadModalComponent implements OnInit {
  @Input() maxFileSize = '1MB';
  @Output() uploaded = new EventEmitter<string>();
  @ViewChild('imageUpload', {static: false}) myPond: any;

  pondOptions;
  id = uuid4();

  pondFiles = [];

  constructor(
    protected ngbModal: NgbModal,
    protected alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.pondOptions = getFilepondOptions({
      name: this.getFilePondName(),
      maxFileSize: this.maxFileSize,
      imageCropAspectRatio: '1:1',
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      multiple: false,
      allowImageCrop: true,
    });

    console.log(this.pondOptions);
  }

  onProcessFile($event: any) {
    this.uploaded.emit(this.getFilePondValue());
    this.activeModal.close();
  }

  getFilePondName() {
    return 'image_upload_' + this.id;
  }

  getFilePondValue(): string | undefined {
    return getInputValueByName(this.getFilePondName());
  }

  onCancelEdit() {
    this.cancel();
  }

  onClose() {
    this.cancel();
  }

  cancel() {
    this.myPond.removeFiles({revert: true});
  }
}
