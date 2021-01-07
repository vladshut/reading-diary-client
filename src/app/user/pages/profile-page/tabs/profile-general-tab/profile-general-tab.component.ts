import {Component, OnInit} from '@angular/core';
import {User} from '@app/models/user';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {addErrorsToForm, validateAllFormFields} from '@app/shared/helpers/form.helper';
import {classToClass, plainToClassFromExist} from 'class-transformer';
import {finalize} from 'rxjs/operators';
import {AuthService} from '@app/core/services/auth.service';
import {AlertService} from '@app/core/services/alert.service';
import {UserService} from '@app/core/services/user.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageUploadModalComponent} from "@app/shared/components/image-upload-modal/image-upload-modal.component";
import {env} from "@env/env";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-profile-general-tab',
  templateUrl: './profile-general-tab.component.html',
  styleUrls: ['./profile-general-tab.component.css']
})
export class ProfileGeneralTabComponent extends WithLoading() implements OnInit {
  user: User;
  form: FormGroup = new FormGroup({});

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    protected ngbModal: NgbModal,
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
      email: [this.user.email, [Validators.required, EmailValidator]],
      name: [this.user.name, [Validators.required]],
      bio: [this.user.bio, [Validators.maxLength(1000)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.form);
      return;
    }

    this.startLoading();

    const updatedData = {
      'name': this.form.controls.name.value,
      'bio': this.form.controls.bio.value,
    };

    const user = plainToClassFromExist(this.user, updatedData);

    const isEmailUpdated = user.email !== this.user.email;

    this.userService.update(user).pipe(
      finalize(() => {
        this.stopLoading();
      })
    ).subscribe(
      () => {
        this.user = user;
        this.auth.setCurrentUser(user);
        this.alertService.updated();
        this.initForm();

        if (isEmailUpdated) {
          this.confirmationSentSuccessfullyAlert();
        }
      },
      (errors) => {
        addErrorsToForm(this.form, errors);
        this.alertService.formError();
      }
    );
  }

  onCancel() {
    this.initForm();
  }

  onAvatarEdit() {
    const modalRef = this.ngbModal.open(ImageUploadModalComponent, {size: 'lg'});
    const imageUploader = <ImageUploadModalComponent>modalRef.componentInstance;
    imageUploader.maxFileSize = '5MB';
    imageUploader.uploaded.subscribe(fileId => {
      const user = classToClass(this.user);
      user.avatar = fileId;
      this.userService.update(user).subscribe((updatedUser: User) => {
        this.user = updatedUser;
        this.auth.setCurrentUser(updatedUser);
        this.alertService.updated();
      });
    });
  }

  getAvatarLink() {
    if (this.user.avatar.startsWith('http') || this.user.avatar.startsWith('https')) {
      return this.user.avatar;
    }

    return env.apiHost + this.user.avatar;
  }

  onSendVerification() {
    const resend$ = this.userService.resendVerificationEmail(this.user);
    this.withLoading(resend$).subscribe(() => {
      this.confirmationSentSuccessfullyAlert();
    });
  }

  private confirmationSentSuccessfullyAlert() {
    const message = this.i18n({value: 'Confirmation was sent you to your email', id: 'user.confirmation.resend_successfully'});
    this.alertService.success(message)
  }
}

