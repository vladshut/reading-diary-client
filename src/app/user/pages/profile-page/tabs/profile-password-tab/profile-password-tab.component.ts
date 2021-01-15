import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SameValidator} from "@app/shared/validators/same.validator";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {User} from "@app/models/user";
import {AuthService} from "@app/core/services/auth.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {addErrorsToForm, validateAllFormFields} from "@app/shared/helpers/form.helper";
import {finalize} from "rxjs/operators";
import {AlertService} from "@app/core/services/alert.service";

@Component({
  selector: 'app-profile-password-tab',
  templateUrl: './profile-password-tab.component.html',
  styleUrls: ['./profile-password-tab.component.css']
})
export class ProfilePasswordTabComponent extends WithLoading() implements OnInit {

  user: User;
  form: FormGroup = new FormGroup({});

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    protected i18n: I18n,
  ) {
    super();
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      new_password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required]],
    }, {validators: [SameValidator({
        new_password: this.i18n({id: 'new_password', value: 'New Password'}),
        confirm_password: this.i18n({id: 'confirm_password', value: 'Confirm Password'}),
      })]});

    if (this.user.has_password) {
      this.form.addControl('old_password', new FormControl('', Validators.required));
    }
  }

  onCancel() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.form);
      return;
    }

    this.startLoading();

    const oldPassword = this.form.get('old_password') ? this.form.get('old_password').value : null;
    const newPassword = this.form.get('new_password').value;
    const confirmPassword = this.form.get('confirm_password').value;

    this.auth.changePassword(oldPassword, newPassword, confirmPassword).pipe(
      finalize(() => {
        this.stopLoading();
      })
    ).subscribe(
      () => {
        this.auth.me().subscribe(user => {
          this.user = user;
          this.initForm();
        });
        this.alertService.updated();
      },
      (errors) => {
        addErrorsToForm(this.form, errors);
        this.alertService.formError();
      }
    );
  }
}
