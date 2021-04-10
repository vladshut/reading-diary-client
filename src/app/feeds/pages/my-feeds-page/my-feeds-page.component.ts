import {Component, OnInit} from '@angular/core';
import {FeedService} from "@app/core/services/feed.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {AuthService} from "@app/core/services/auth.service";
import {User} from "@app/models/user";
import {Pagination} from "@app/models/pagination";
import {Feed} from "@app/models/feed";

@Component({
  selector: 'app-my-feeds-page',
  templateUrl: './my-feeds-page.component.html',
  styleUrls: ['./my-feeds-page.component.css']
})
export class MyFeedsPageComponent extends WithLoading() implements OnInit {

  private currentUser: User;
  private page: number = 1;
  feeds: Feed[] = [];

  constructor(
    private feedsService: FeedService,
    private auth: AuthService,
  ) {
    super();
    this.currentUser = auth.getUser();
  }

  ngOnInit() {
    this.loadFeeds(MyFeedsPageComponent.buildFilter(this.page));
  }

  onScroll() {
    this.page++;
    this.loadFeeds(MyFeedsPageComponent.buildFilter(this.page));
  }

  private loadFeeds(filter: { per_page: number, page: number }) {
    const $feeds = this.feedsService.my(filter);
    this.withLoading($feeds).subscribe(pagination => this.feeds.push(...pagination.data));
  }

  private static buildFilter(page: number = 1) {
    return {page, per_page: 10};
  }
}
