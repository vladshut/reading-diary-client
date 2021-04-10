import {Component, OnInit} from '@angular/core';
import {User} from "@app/models/user";
import {Pagination} from "@app/models/pagination";
import {Feed} from "@app/models/feed";
import {FeedService} from "@app/core/services/feed.service";
import {AuthService} from "@app/core/services/auth.service";
import {WithLoading} from "@app/mixins/WithLoading";

interface Filter {
  query?: string,
  page: number,
  per_page: number,
  type: string,
  is_favorite: boolean,
}

@Component({
  selector: 'app-favorite-feeds-page',
  templateUrl: './favorite-feeds-page.component.html',
  styleUrls: ['./favorite-feeds-page.component.css']
})
export class FavoriteFeedsPageComponent extends WithLoading() implements OnInit {
  private currentUser: User;
  query?: string = '';
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
    const filter = <Filter>{page, per_page: 10, type: Feed.TYPE_REPORT_PUBLISHED, is_favorite: true};

    if (this.query) {
      filter.query = this.query;
    }

    return filter;
  }

  onSearch(query: string) {
    this.query = query;
    this.loadFeeds(this.buildFilter());
  }

  onResetSearch() {
    this.query = null;
    this.loadFeeds(this.buildFilter());
  }

  goToPage(page: number = 1) {
    this.loadFeeds(this.buildFilter(page));
  }
}
