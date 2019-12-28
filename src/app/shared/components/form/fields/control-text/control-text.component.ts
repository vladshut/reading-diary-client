import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-text',
  templateUrl: './control-text.component.html',
  styleUrls: ['./control-text.component.css']
})
export class ControlTextComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() inputType = 'text';
  @Input() id = '';
  @Input() class = '';
  @Input() name = '';
  @Input() placeholder = '';
  
  constructor() {
  
  }
  
  ngOnInit(): void {
  }
}
