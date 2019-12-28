import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Observable, of} from "rxjs";
import {Dictionary} from "@app/models/dictionary";

@Injectable()
export class GenreService extends BaseService {
  protected apiUrl = 'genres';

  list(): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(this.getUrl());
  }
}
