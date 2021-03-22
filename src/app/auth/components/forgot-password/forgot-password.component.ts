import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { env } from '@env/env';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { addErrorsToForm, validateAllFormFields } from '@app/shared/helpers/form.helper';
import { AuthService } from '@app/core/services/auth.service';
import { AlertService } from '@app/core/services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loading = 0;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService,
    private i18n: I18n,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.form);
      return;
    }

    this.loading ++;
    const email = this.form.value.email;
    this.auth.sendResetPasswordEmail(email).subscribe(() => {
      this.loading --;
      this.alertService.info(this.i18n({value: 'Please check your mailbox for future instructions.', id: 'auth.forgot_password.alert.success'}));
      this.router.navigate(['/login']);
    }, (errors) => {
      addErrorsToForm(this.form, errors);
      this.alertService.formError();
      this.loading --;
    });
  }
}
