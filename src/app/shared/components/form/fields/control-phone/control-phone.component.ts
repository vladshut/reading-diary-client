import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-phone',
  templateUrl: './control-phone.component.html',
  styleUrls: ['./control-phone.component.css']
})
export class ControlPhoneComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() id = '';
  @Input() placeholder = '';
  @Input() class = '';
  @Input() name = '';
  
  constructor() { }

  ngOnInit() {
  }

}
