import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {WithLoading} from "@app/mixins/WithLoading";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@app/core/services/auth.service";
import {AlertService} from "@app/core/services/alert.service";
import {I18n} from "@ngx-translate/i18n-polyfill";

@Component({
  selector: 'app-auth-social',
  templateUrl: './auth-social.component.html',
  styleUrls: ['./auth-social.component.css']
})
export class AuthSocialComponent extends WithLoading() implements OnInit {
  redirectUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    this.auth.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/books/list';

    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.startLoading();
      this.auth.loginWithToken(token).pipe(finalize(() => this.stopLoading()))
        .subscribe(() => {
          this.router.navigate([this.redirectUrl])
        }, () => {
          this.alertService.error(this.i18n({value: 'Wrong token is provided!', id: 'auth.login.wrong_token_is_provided'}))
          this.stopLoading();
        });
    }
  }

  login(method: string) {
    this.startLoading();
    this.auth.loginWith(method)
      .subscribe((res) => {
          this.stopLoading();
          location.href = res.redirect_to;
        },
        error => {
          this.alertService.error(this.i18n({id: 'auth.bad_credentials', value: 'Bad credentials!'}));
          this.stopLoading();
        }
      );
  }

}
