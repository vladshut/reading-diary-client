import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-wrapper',
  templateUrl: './field-wrapper.component.html',
  styleUrls: ['./field-wrapper.component.css']
})
export class FieldWrapperComponent implements OnInit {
  @Input() control: FormControl;
  @Input() id: string;
  @Input() name = '';
  @Input() form: FormGroup;
  @Input() label: string;
  
  constructor() { }
  
  ngOnInit() {
    if (!this.form && this.control.parent instanceof FormGroup) {
      this.form = this.control.parent;
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
