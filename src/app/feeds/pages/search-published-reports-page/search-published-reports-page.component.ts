import {Component, OnInit} from '@angular/core';
import {User} from "@app/models/user";
import {Feed} from "@app/models/feed";
import {FeedService} from "@app/core/services/feed.service";
import {AuthService} from "@app/core/services/auth.service";
import {WithLoading} from 'src/app/mixins/WithLoading';
import {Pagination} from "@app/models/pagination";

interface Filter {
  query: string,
  page: number,
  per_page: number,
  type: string,
}

@Component({
  selector: 'app-search-published-reports-page',
  templateUrl: './search-published-reports-page.component.html',
  styleUrls: ['./search-published-reports-page.component.css']
})
export class SearchPublishedReportsPageComponent extends WithLoading() implements OnInit {
  private currentUser: User;
  query: string = '';
  pagination: Pagination<Feed>;
  minQueryLength: number = 3;

  constructor(
    private feedsService: FeedService,
    private auth: AuthService,
  ) {
    super();
    this.currentUser = auth.getUser();
  }

  ngOnInit() {
    this.loadFeeds(this.buildFilter());
  }

  private loadFeeds(filter: Filter) {
    const $feeds = this.feedsService.list(filter);
    this.withLoading($feeds).subscribe(pagination => this.pagination = pagination);
  }

  private buildFilter(page: number = 1): Filter {
    return {page, per_page: 10, type: Feed.TYPE_REPORT_PUBLISHED, query: this.query};
  }

  onSearch(query: string) {
    this.query = query;
    this.loadFeeds(this.buildFilter());
  }

  goToPage(page: number = 1) {
    this.loadFeeds(this.buildFilter(page));
  }
}
