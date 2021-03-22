import { Component, OnInit } from '@angular/core';
import {BookService} from "@app/core/services/book.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {TopLanguage} from "@app/dashboard/models/top-language";
import {AuthService} from "@app/core/services/auth.service";
import {CountryPickerService} from "ngx-country-picker";

@Component({
  selector: 'app-top-languages',
  templateUrl: './top-languages.component.html',
  styleUrls: ['./top-languages.component.css']
})
export class TopLanguagesComponent extends WithLoading() implements OnInit {

  stats: TopLanguage[];
  badgeTypes = ['primary', 'info', 'warning', 'success', 'secondary', 'danger'];
  languages = {};

  constructor(
    private countryPickerService: CountryPickerService,
    private bookService: BookService,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.countryPickerService.getCountries().subscribe(countries => {
      countries.forEach(c => {
        for (let key in c.languages) {
            this.languages[key] = c.languages[key];
        }
      });
    });

    const stats = this.bookService.topLanguages(this.auth.getUser().id);

    this.withLoading(stats).subscribe((result: TopLanguage[]) => {
      this.stats = result;
    });
  }

}
