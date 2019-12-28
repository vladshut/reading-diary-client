import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { SweetAlertService } from '@app/core/services/sweet-alert.service';
import { ucFirst } from '@app/shared/helpers/functions.helper';
import { AlertService } from '@app/core/services/alert.service';
import Swal from "sweetalert2";


@Component({
    selector: 'app-alert',
    template: ''
})

export class AlertComponent implements OnInit, OnDestroy {
    private alertSubscription: Subscription;
    private sweetAlertSubscription: Subscription;
    private typeTitles: {[key: string]: string} = {};

    constructor(
      private alertService: AlertService,
      private sweetAlertService: SweetAlertService,
      private toastr: ToastrService,
      private i18n: I18n,
    ) {
        this.typeTitles = {
            'error': this.i18n('Error'),
            'success': this.i18n('Success'),
            'info': this.i18n('Info'),
        };
    }

    ngOnInit() {
        this.alertSubscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
                this.toastr[message.type](message.text, this.resolveTitle(message));
            }
        });

        this.sweetAlertSubscription = this.sweetAlertService.getMessage().subscribe(message => {
            if (message) {
                Swal.fire(this.resolveTitle(message), message.text, message.type);
            }
        });
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.sweetAlertSubscription.unsubscribe();
    }

    private resolveTitle(message: any) {
        return message.title || this.typeTitles[message.type] || ucFirst(message.type);
    }
}
