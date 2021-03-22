import {Component, Input, OnInit} from '@angular/core';
import {User} from "@app/models/user";
import {FeedService} from "@app/core/services/feed.service";
import {Feed} from "@app/models/feed";
import {WithLoading} from "@app/mixins/WithLoading";
import {Pagination} from "@app/models/pagination";

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent extends WithLoading() implements OnInit {
  @Input() user: User;

  pagination: Pagination<Feed>;

  constructor(
    private feedService: FeedService,
  ) {
    super();
  }

  ngOnInit() {
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.loadFeeds(this.buildFilter(page));
  }

  private loadFeeds(filter: {page: number, author_id: string, type: string, per_page: number}) {
    const $feeds = this.feedService.list(filter);
    this.withLoading($feeds).subscribe(pagination => this.pagination = pagination);
  }

  private buildFilter(page: number = 1) {
    return {page, author_id: this.user.id, type: 'report_published', per_page: 5};
  }

}
