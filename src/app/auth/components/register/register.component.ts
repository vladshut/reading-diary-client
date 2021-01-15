import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '@app/models/user';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {addErrorsToForm, validateAllFormFields} from '@app/shared/helpers/form.helper';
import {UserService} from '@app/core/services/user.service';
import {AlertService} from '@app/core/services/alert.service';
import {AuthService} from '@app/core/services/auth.service';
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  templateUrl: 'register.component.html',
  selector: 'app-register',
})
export class RegisterComponent extends WithLoading() implements OnInit {
  registerForm: FormGroup;
  redirectUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private auth: AuthService,
    private i18n: I18n,
  ) {
    super();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreementConfirmed: [null, [Validators.required]],
    });

    this.redirectUrl = '';

    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['redirectUrl'] && queryParams['redirectUrl'] !== '/' && queryParams['redirectUrl'] !== '') {
      this.redirectUrl = queryParams['redirectUrl'];
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.registerForm);
      return;
    }

    this.startLoading();

    const extraParams = this.route.snapshot.queryParams;
    const email = this.f.email.value;
    const password = this.f.password.value;
    this.auth.register(email, password, extraParams)
      .pipe(first())
      .subscribe(
        (user: User) => {
          this.alertService.success(this.i18n('Registration successful'));
          this.stopLoading();
          this.router.navigate([this.redirectUrl]);
        },
        formErrors => {
          addErrorsToForm(this.registerForm, formErrors);
          this.alertService.formError();
          this.stopLoading();
        });
  }
}
