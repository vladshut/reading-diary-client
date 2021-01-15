import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {AuthService} from '@app/core/services/auth.service';
import {AlertService} from '@app/core/services/alert.service';
import {WithLoading} from "@app/mixins/WithLoading";
import {validateAllFormFields} from "@app/shared/helpers/form.helper";

@Component({
  templateUrl: 'login.component.html',
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends WithLoading() implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  redirectUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.auth.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/books/list';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.loginForm);
      return;
    }

    this.startLoading();
    this.auth.login(this.f.email.value, this.f.password.value)
      .subscribe(
        user => {
          this.alertService.success(this.i18n({value: 'You are logged in', id: 'auth.login.success'}));
          this.stopLoading();
          this.router.navigate([this.redirectUrl]);
        },
        error => {
          this.alertService.error(this.i18n({value: 'Bad credentials!', id: 'auth.login.error'}));
          this.stopLoading();
        });
  }
}
