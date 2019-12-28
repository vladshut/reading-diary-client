import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { addErrorsToForm, validateAllFormFields } from '@app/shared/helpers/form.helper';
import { AuthService } from '@app/core/services/auth.service';
import { AlertService } from '@app/core/services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading = 0;
  form: FormGroup;
  token: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private i18n: I18n,
  ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.token = queryParams['token'];
    });
    
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: this.passwordConfirmationValidator.bind(this)});
  }
  
  onSubmit() {
    if (this.form.invalid) {
      if (this.form.errors.passwordConfirmation) {
        this.alertService.error(this.i18n('Passwords are not match!'));
      } else {
        this.alertService.formError();
      }
      validateAllFormFields(this.form);
      return;
    }
    
    this.loading ++;
    const password = this.form.value.password;
    this.auth.resetPassword(password, this.token).subscribe(() => {
      this.loading --;
      this.alertService.success(this.i18n('Your password has been changed successfully!'));
      this.alertService.info('Use your new password to login.');
      this.router.navigate(['/login']);
    }, (errors) => {
      addErrorsToForm(this.form, errors);
      this.alertService.formError();
      this.loading --;
    });
  }
  
  passwordConfirmationValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.get('password').value !== control.get('passwordConfirmation').value) {
      return { 'passwordConfirmation': true };
    }
    
    return null;
  }
}
