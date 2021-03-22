import {
  APP_INITIALIZER,
  LOCALE_ID,
  MissingTranslationStrategy,
  NgModule,
  Optional,
  SkipSelf,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard, UnAuthGuard } from './guards';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { TranslationService } from './services/translation.service';
import { LocaleInterceptor } from './interceptors/locale.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';
import { SweetAlertService } from '@app/core/services/sweet-alert.service';
import { AlertService } from '@app/core/services/alert.service';
import { AuthService } from '@app/core/services/auth.service';
import { UserService } from '@app/core/services/user.service';
import {DictionaryService} from "@app/core/services/dictionary.service";
import {ValidationService} from "@app/core/services/validation.service";
import {BytesPipe} from "angular-pipes";
import {BookService} from "@app/core/services/book.service";
import {AuthorService} from "@app/core/services/author.service";
import {GenreService} from "@app/core/services/genre.service";
import {FileService} from "@app/core/services/file.service";
import {BookSectionService} from "@app/core/services/book-section.service";
import {ReportService} from "@app/core/services/report.service";
import {PublicReportService} from "@app/core/services/public-report.service";
import {FeedService} from "@app/core/services/feed.service";

export function loadDictionaries(dictionaryService: DictionaryService) {
  return () => dictionaryService.load();
}

@NgModule({
  providers: [
    NgbActiveModal,

    /** Guards **/
    AuthGuard,
    UnAuthGuard,
    CanDeactivateGuard,

    /** General services **/
    AlertService,
    SweetAlertService,
    AuthService,
    TranslationService,
    I18n,
    ValidationService,
    BytesPipe,
    DictionaryService,

    /** Domain services **/
    UserService,
    BookService,
    AuthorService,
    GenreService,
    FileService,
    BookSectionService,
    ReportService,
    PublicReportService,
    FeedService,

    { provide: APP_INITIALIZER, useFactory: loadDictionaries, deps: [DictionaryService], multi: true },

    {provide: HTTP_INTERCEPTORS, useClass: LocaleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    {provide: LOCALE_ID, useValue: 'en'},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    {provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Error},
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en';
        return require(`!raw-loader!../../i18n/messages.${locale.substr(0, 2)}.xlf`).default;
      },
      deps: [LOCALE_ID]
    },
  ],
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not run!'); // Singleton
    }
  }
}
