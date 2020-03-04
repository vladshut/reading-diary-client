import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRouterModule} from "./app-routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ModalModule} from "ngx-bootstrap";
import {AuthService} from "./core/services/auth.service";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {registerLocaleData} from "@angular/common";
import {CountryPickerModule} from "ngx-country-picker";
import {JwtModule} from "@auth0/angular-jwt";
import localeEnNl from '@angular/common/locales/en-NL';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    CountryPickerModule.forRoot(),
    HotkeyModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),

    CoreModule,
    SharedModule,
    PDFExportModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
}

registerLocaleData(localeEnNl, 'en-NL');
