import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '@app/models/dictionary';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-control-select',
  templateUrl: './control-select.component.html',
  styleUrls: ['./control-select.component.css']
})
export class ControlSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() id = '';
  @Input() placeholder = '';
  @Input() class = '';
  @Input() name = '';
  @Input() options: Dictionary[] = [];
  
  @Output() change = new EventEmitter<void>();
  
  constructor(
    private i18n: I18n,
  ) { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = this.i18n({value: 'Choose option ...', id: 'select.placeholder'});
    }
  }
  
  compareFn(d1: Dictionary, d2: Dictionary) {
    return d1 && d2 ? d1.alias === d2.alias : d1 === d2;
  }
}
