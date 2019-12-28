import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '@app/models/dictionary';
import { SelectItem } from '@app/shared/components/select-items-modal/select-items-modal.component';
import { Observable } from 'rxjs';
import uuidv4 from "uuid/v4";

@Component({
  selector: 'app-control',
  templateUrl: './control-html-builder.component.html',
  styleUrls: ['./control-html-builder.component.css'],
})
export class ControlHtmlBuilderComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() type: string;
  @Input() inputType = '';
  @Input() id = '';
  @Input() class = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() options: Dictionary[] = [];
  @Input() value: any;
  @Input() multiple = true;

  @Input() fileTypes = [];

  @Input() btnIcon: string;
  @Input() btnText: string;
  @Input() btnType = 'primary';

  @Input() actionName: string;
  @Input() items: SelectItem[] | Observable<SelectItem[]> = [];
  @Input() onItemCreate: () => Observable<SelectItem[]>;
  @Input() disabledItems: SelectItem[] = [];
  @Input() showSelected = true;
  @Input() btnSize = 'sm';

  @Output() changed = new EventEmitter<any>();
  @Output() btnClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (!this.form && this.control.parent instanceof FormGroup) {
      this.form = this.control.parent;
    }

    if (!this.id) {
      this.id = uuidv4();
    }

    if (!this.name && this.form) {
      const controls = this.form.controls;
      this.name = Object.keys(controls).find(name => this.control === controls[name]);
    }
  }

  isRequired (): boolean {
    if (this.control && this.control.validator) {
      const validator = this.control.validator({} as AbstractControl);

      return validator && validator.required;
    }
  }
}
