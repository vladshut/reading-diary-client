import { Component, Input, OnInit } from '@angular/core';
import { CountryPickerService, ICountry } from 'ngx-country-picker';
import { FormControl, FormGroup } from '@angular/forms';

interface Lang {
  code: string;
  name: string;
  flag: string
}

@Component({
  selector: 'app-control-lang',
  templateUrl: './control-lang.component.html',
  styleUrls: ['./control-lang.component.css']
})
export class ControlLangComponent implements OnInit {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() flag = true;
  @Input() class = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() id = '';

  public languages: Lang[] = [];
  public baseUrl: string;

  constructor(private countryPickerService: CountryPickerService) {
    this.baseUrl = countryPickerService.getBaseUrl() + 'img/flags-svg/';
  }

  public ngOnInit() {
    this.countryPickerService.getCountries().subscribe(countries => {
      const usedLanguages = [];

      countries.forEach(c => {
        for (let key in c.languages) {
          if (usedLanguages.indexOf(key) === -1) {
            this.languages.push({code: key, name: c.languages[key], flag: c.cca3.toLowerCase()});
            usedLanguages.push(key);
          }
        }
      });

      this.languages.sort((a: Lang, b: Lang) => {
        const na = a.name;
        const nb = b.name;
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
}
