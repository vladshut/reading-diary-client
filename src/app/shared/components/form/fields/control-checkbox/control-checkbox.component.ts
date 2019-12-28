import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-checkbox',
  templateUrl: './control-checkbox.component.html',
  styleUrls: ['./control-checkbox.component.css']
})
export class ControlCheckboxComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() label;
  @Input() id = '';
  @Input() class = '';
  @Input() name = '';
  
  constructor() { }

  ngOnInit() {
  
  }
}
