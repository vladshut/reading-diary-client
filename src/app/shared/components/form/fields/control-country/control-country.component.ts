import { Component, Input, OnInit } from '@angular/core';
import { CountryPickerService, ICountry } from 'ngx-country-picker';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-country',
  templateUrl: './control-country.component.html',
  styleUrls: ['./control-country.component.css']
})
export class ControlCountryComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() flag = true;
  @Input() setValue = 'cca2';
  @Input() setName = 'name.common';
  @Input() class = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() id = '';

  public countries: ICountry[] = [];
  public baseUrl: string;

  constructor(private countryPickerService: CountryPickerService) {
    this.baseUrl = countryPickerService.getBaseUrl() + 'img/flags-svg/';
  }

  public ngOnInit() {
    this.countryPickerService.getCountries().subscribe(countries => {
      this.countries = countries.sort((a: ICountry, b: ICountry) => {
        const na = this.getName(a);
        const nb = this.getName(b);
        if (na > nb) {
          return 1;
        }
        if (na < nb) {
          return -1;
        }
        return 0;
      });
    });
  }

  public getValue(obj: ICountry) {
    return this.setValue.split('.').reduce((o, i) => o[i], obj);
  }

  public getName(obj: ICountry) {
    return this.setName.split('.').reduce((o, i) => o[i], obj);
  }

}
