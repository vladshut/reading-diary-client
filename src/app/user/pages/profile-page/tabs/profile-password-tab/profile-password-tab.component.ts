import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SameValidator} from "@app/shared/validators/same.validator";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {User} from "@app/models/user";
import {AuthService} from "@app/core/services/auth.service";
import {WithLoading} from "@app/mixins/WithLoading";

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

  }
}
