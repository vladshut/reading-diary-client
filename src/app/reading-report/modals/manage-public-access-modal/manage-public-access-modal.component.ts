import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBook} from "@app/models/user-book";
import {env} from "@env/env";
import {copyToClipboard} from "@app/shared/helpers/functions.helper";
import {AlertService} from "@app/core/services/alert.service";

@Component({
  selector: 'app-manage-public-access-modal',
  templateUrl: './manage-public-access-modal.component.html',
  styleUrls: ['./manage-public-access-modal.component.css']
})
export class ManagePublicAccessModalComponent implements OnInit {
  @Input() userBook: UserBook;
  @Output() closePublicAccess = new EventEmitter();

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  publicLink(): string {
    return env.baseUrl + '/public-report/' + this.userBook.report_public_key;
  }

  copyToClipBoard() {
    copyToClipboard(this.publicLink());
    this.alertService.info('Copied to clipboard');
  }
}
