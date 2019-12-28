import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { isArray, isObject, isString } from 'util';
import { ValidationService } from '@app/core/services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() debug: false;

  constructor(
    private validationService: ValidationService,
  ) {}

  ngOnInit() {
  }

  get errorMessage() {
    if (!this.control || !this.control.errors) {
      return null;
    }

    const errors = this.control.errors;

    if (Array.isArray(errors) && errors.length > 0 && (typeof (errors[0]) === 'string')) {
      return errors[0];
    }

    if (errors !== null && typeof errors === 'object') {
      for (const propertyName in errors) {
        if (errors.hasOwnProperty(propertyName) && this.control.touched) {
          return this.validationService.getValidatorErrorMessage(propertyName, errors[propertyName]);
        }
      }
    }

    return null;
  }
}
