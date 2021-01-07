import {Component, OnInit} from '@angular/core';
import {AuthService} from "@app/core/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WithLoading} from "@app/mixins/WithLoading";
import {finalize} from "rxjs/operators";
import {AlertService} from "@app/core/services/alert.service";
import {I18n} from "@ngx-translate/i18n-polyfill";

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent extends WithLoading() implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    const link = this.route.snapshot.queryParams['link'] || '';

    const $verifyEmail = this.authService.verifyEmail(link);

    this.withLoading($verifyEmail)
      .pipe(finalize(() => this.router.navigate(['user/settings'])))
      .subscribe(
        () => {
          this.authService.me().subscribe(() => {
            this.alertService.success(this.i18n({
              id: 'auth.email_verification.success',
              value: 'Email is verified!'
            }));
          });
        },
        () => this.alertService.error(this.i18n({
          id: 'auth.email_verification.error',
          value: 'Email is not verified!'
        })),
      );
  }
}
