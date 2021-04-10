import {Component, Input, OnInit} from '@angular/core';
import {Feed} from "@app/models/feed";
import {FeedService} from "@app/core/services/feed.service";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent extends WithLoading() implements OnInit {
  @Input() feed: Feed;

  constructor(
    private feedService: FeedService,
  ) {
    super();
  }

  ngOnInit() {
  }

  addToFavorites() {
    const $addToFavorites = this.feedService.addToFavorites(this.feed);

    this.withLoading($addToFavorites).subscribe(() => this.feed.is_favorite = true);
  }

  removeFromFavorites() {
    const $removeFromFavorites = this.feedService.removeFromFavorites(this.feed);

    this.withLoading($removeFromFavorites).subscribe(() => this.feed.is_favorite = false);
  }
}
