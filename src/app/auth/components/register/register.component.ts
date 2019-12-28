import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '@app/models/user';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { addErrorsToForm, validateAllFormFields } from '@app/shared/helpers/form.helper';
import { UserService } from '@app/core/services/user.service';
import { AlertService } from '@app/core/services/alert.service';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  templateUrl: 'register.component.html',
  selector: 'app-register',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  redirectUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private auth: AuthService,
    private i18n: I18n,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
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

    this.loading = true;
    const extraParams = this.route.snapshot.queryParams;
    const email = this.f.email.value;
    const password = this.f.password.value;
    const name = this.f.name.value;
    const agreementConfirmed = this.f.agreementConfirmed.value;
    this.userService.register(email, password, name, agreementConfirmed, extraParams)
      .pipe(first())
      .subscribe(
        (user: User) => {
          this.auth.setCurrentUser(user);
          this.alertService.success(this.i18n('Registration successful'));
          this.loading = false;
          this.router.navigate([this.redirectUrl]);
        },
        formErrors => {
          addErrorsToForm(this.registerForm, formErrors);
          this.alertService.formError();
          this.loading = false;
        });
  }
}
