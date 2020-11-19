import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-textarea',
  templateUrl: './control-textarea.component.html',
  styleUrls: ['./control-textarea.component.css']
})
export class ControlTextareaComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() id = '';
  @Input() class = '';
  @Input() name = '';
  @Input() placeholder = '';

  constructor() { }

  ngOnInit() {
  }

  submitParentForm($event: KeyboardEvent) {
    if ($event.ctrlKey) {
     console.log('submit');
    }
  }
}
