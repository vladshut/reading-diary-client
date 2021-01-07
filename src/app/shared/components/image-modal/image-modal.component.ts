import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() src: string;
  @Input() caption: string = '';

  constructor() { }

  ngOnInit() {
  }
}
