import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '@env/env';
import { Injectable } from '@angular/core';
import { objectToFormData } from '@app/shared/helpers/functions.helper';

@Injectable()
export class BaseService {
  private baseUrl = `${env.apiHost}/api/`;
  protected apiUrl = ``;

  constructor(protected http: HttpClient) {
  }

  protected getUrl(urlPart: string = '', params: {[key: string]: string} = {}, absolute = false) {
    let url = (absolute ? '' : (this.apiUrl + '/')) + urlPart;

    for (let [key, value] of Object.entries(params)) {
      value = value ? value : '';
      const reStr = value ? `:${key}` : `:${key}\/`;
      const re = new RegExp(reStr, 'gi');
      url = url.replace(re, value);
    }

    const cleanRe = /\:.+?\//;
    url = url.replace(cleanRe, '');

    url = this.baseUrl + url;

    return url.trimChars('/');
  }

  protected toFormData(data: any, files: File[] | FileList = []) {
    return objectToFormData({'_data': JSON.stringify(data), 'test': 'test', files});
  }
}
