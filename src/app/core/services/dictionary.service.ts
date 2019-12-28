import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '@env/env';
import { Dictionary } from '@app/models/dictionary';
import { getCircularReplacer } from '@app/shared/helpers/functions.helper';

const LOCAL_STORAGE_KEY = 'dictionaries';

export const GENRES = 'genre';

@Injectable()
export class DictionaryService {

  private apiUrl = `${env.apiHost}/api/dictionary`;
  private dictionaries: {[index: string]: Dictionary[]} = {};

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private localeId: string,
  ) {
    this.dictionaries = JSON.parse(localStorage.getItem(this.getLocalStorageKey()) || '{}');
  }

  load(): Promise<{[name: string]: Dictionary[]}> {
      return this.http.get<{[name: string]: Dictionary[]}>(this.apiUrl).toPromise().then(
        dictionaries => {
          this.dictionaries = dictionaries;
          localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(dictionaries, getCircularReplacer()));

          return dictionaries;
        }
      );
  }

  list(name: string): Dictionary[] {
    return this.dictionaries[name] || [];
  }

  findByAlias(dictionaryName: string, alias: string): Dictionary {
    const dictionary = this.dictionaries[dictionaryName];

    if (!dictionary) {
      return undefined;
    }

    return dictionary.find(d => d.alias === alias);
  }

  private getLocalStorageKey() {
    return 'dictionaries.' + this.localeId;
  }
}
