import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attachment } from '@app/models/attachment';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {
  @Input() attachments: Attachment[] = [];

  @Output() download = new EventEmitter<Attachment>();
  
  constructor() { }

  ngOnInit() {
  }
  
  onDownload(a: Attachment) {
    this.download.emit(a);
  }
}
