import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title;
  @Output() closed = new EventEmitter<void>();
  
  loading = 0;
  
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  
  onCloseClicked() {
    this.closed.emit();
    this.activeModal.close();
  }
}
