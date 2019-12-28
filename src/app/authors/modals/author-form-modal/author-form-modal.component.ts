import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "@app/core/services/validation.service";
import {AlertService} from "@app/core/services/alert.service";
import {validateAllFormFields} from "@app/shared/helpers/form.helper";
import {AuthorService} from "@app/core/services/author.service";
import {Author} from "@app/models/author";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

@Component({
  selector: 'app-author-form-modal',
  templateUrl: './author-form-modal.component.html',
  styleUrls: ['./author-form-modal.component.css']
})
export class AuthorFormModalComponent implements OnInit {
  @Output() created = new EventEmitter<Author>();

  form: FormGroup;
  loading = 0;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authorService: AuthorService,
    private modal: NgbActiveModal,
  ) {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      location: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      death_date: [null],
      bio: [null, [Validators.maxLength(500)]],
      wikipedia_url: [null, [Validators.pattern(ValidationService.PATTERN_URL)]],
    });
  }

  get f () {
    return this.form.controls;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.form);
      return;
    }

    const formData = this.form.value;
    const bd = formData.birth_date;
    const dd = formData.death_date;
    formData.birth_date = moment(`${bd['year']}-${bd['month']}-${bd['day']}`, 'YYYY-M-D').format('YYYY-M-D');
    formData.death_date = moment(`${dd['year']}-${dd['month']}-${dd['day']}`, 'YYYY-M-D').format('YYYY-M-D');

    this.loading ++;

    this.authorService.create(formData).subscribe(author => {
      this.alertService.created();
      this.created.emit(author);
      this.loading --;
      this.modal.close();
    });
  }
}
