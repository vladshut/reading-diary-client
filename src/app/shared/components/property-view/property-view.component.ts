import { Component, Input, OnInit } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css']
})
export class PropertyViewComponent implements OnInit {
  @Input() label: string;
  @Input() value: string|number;
  @Input() defaultValue: string;
  
  constructor(
    private i18n: I18n,
  ) { }

  ngOnInit() {
    this.defaultValue = this.defaultValue || this.i18n({id: 'property.not_specified', value: 'Not specified'});
  }
}
