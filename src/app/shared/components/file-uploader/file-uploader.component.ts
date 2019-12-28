import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { env } from '@env/env';
import { AuthService } from '@app/core/services/auth.service';

const URL = `${env.apiHost}/api/`;

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Input() url;
  @Output() uploaded = new EventEmitter();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  isUploaded = false;

  constructor(
    private activeModal: NgbActiveModal,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.uploader = new FileUploader({
      url: URL + this.url,
      authTokenHeader: 'Authorization',
      authToken: 'Bearer ' + this.auth.getToken(),
      isHTML5: true
    });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (item.isSuccess) {
        this.isUploaded = true;
      }
    };
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public close() {
    if (this.isUploaded) {
      this.uploaded.emit();
    }
    this.activeModal.close();
  }
}
