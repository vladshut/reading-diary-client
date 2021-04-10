import {Injectable} from "@angular/core";
import {BaseService} from "@app/core/services/base.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClassFromExist} from "class-transformer";
import {toHttpParams} from "@app/shared/helpers/functions.helper";
import {Pagination} from "@app/models/pagination";
import {Feed} from "@app/models/feed";

@Injectable()
export class FeedService extends BaseService {
  protected apiUrl = 'feeds';

  getPublishedReportFeedsByUser(author_id: string, per_page: number = 10): Observable<Pagination<Feed>> {
    return this.list({author_id, per_page, type: 'report_published'});
  }

  list(filter: object = {}): Observable<Pagination<Feed>> {
    const params = toHttpParams(filter);

    const url = this.getUrl();

    return this.http.get<Pagination<Feed>>(url, {params})
      .pipe(map(pagination => FeedService.mapPagination(pagination)));
  }

  my(filter: object = {}): Observable<Pagination<Feed>> {
    const params = toHttpParams(filter);

    const url = this.getUrl('my');

    return this.http.get<Pagination<Feed>>(url, {params})
      .pipe(map(pagination => FeedService.mapPagination(pagination)));
  }

  addToFavorites(feed: Feed): Observable<void> {
    const url = this.getUrl(feed.id + '/favorite');

    return this.http.post<void>(url, {});
  }

  removeFromFavorites(feed: Feed): Observable<void> {
    const url = this.getUrl(feed.id + '/favorite');

    return this.http.delete<void>(url);
  }


  private static mapPagination(pagination): Pagination<Feed> {
    let paginationObj = new Pagination<Feed>(Feed);
    paginationObj = plainToClassFromExist(paginationObj, pagination);

    return paginationObj;
  }
}
