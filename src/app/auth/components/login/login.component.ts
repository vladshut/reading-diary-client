import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {AuthService} from '@app/core/services/auth.service';
import {AlertService} from '@app/core/services/alert.service';
import {finalize} from "rxjs/operators";

@Component({
  templateUrl: 'login.component.html',
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loading = 0;
  redirectUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private i18n: I18n,
  ) {
  }

  ngOnInit() {
    this.auth.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/books/list';
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.loading ++;
      this.auth.loginWithToken(token).pipe(finalize(() => this.loading --))
        .subscribe(() => {
          this.router.navigate([this.redirectUrl])
        }, () => {
          this.alertService.error(this.i18n({value: 'Wrong token is provided!', id: 'auth.login.wrong_token_is_provided'}))
          this.loading --;
        });
    }
  }

  login(method: string) {
    this.loading ++;
    this.auth.loginWith(method)
      .subscribe((res) => {
          this.loading --;
          location.href = res.redirect_to;
        },
        error => {
          this.alertService.error(this.i18n('Bad credentials!'));
          this.loading --;
        }
      );
  }
}
