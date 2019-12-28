import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-action-confirm-dialog',
  templateUrl: './action-confirm-dialog.component.html',
  styleUrls: ['./action-confirm-dialog.component.css']
})
export class ActionConfirmDialogComponent implements OnInit {
  @Output() cancelled = new EventEmitter();
  @Output() confirmed = new EventEmitter();

  public text = '';
  public title = '';

  constructor(
    private activeModal: NgbActiveModal,
    private i18n: I18n,
  ) {
    this.text = i18n('Confirm the action?');
    this.title = i18n('Confirmation');
  }

  ngOnInit() {
  }

  public cancel() {
    this.cancelled.emit();
    this.close();
  }

  public close() {
    this.activeModal.close();
  }

  public confirm() {
    this.confirmed.emit();
    this.close();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }
}
