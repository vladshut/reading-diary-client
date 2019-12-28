import { Component, Input, OnInit } from '@angular/core';
import { Attachment } from '@app/models/attachment';

@Component({
  selector: 'app-attachments-count',
  templateUrl: './attachments-count.component.html',
  styleUrls: ['./attachments-count.component.css']
})
export class AttachmentsCountComponent implements OnInit {
  @Input() attachments: Attachment[] = [];

  constructor() { }

  ngOnInit() {
  }

}
