import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.css']
})
export class ControlButtonComponent implements OnInit {
  @Input() id = '';
  @Input() class = '';
  @Input() icon = '';
  @Input() text = '';
  @Input() type = 'primary';
  
  @Output() btnClicked = new EventEmitter<void>();
  
  constructor() {}
  
  ngOnInit(): void {}
}
