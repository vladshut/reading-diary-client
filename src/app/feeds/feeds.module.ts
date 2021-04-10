import {NgModule} from '@angular/core';
import {MyFeedsPageComponent} from './pages/my-feeds-page/my-feeds-page.component';
import {SharedModule} from "@app/shared/shared.module";
import {FeedsRoutingModule} from "@app/feeds/feeds-routing.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgTruncatePipeModule} from "angular-pipes";
import { FeedComponent } from './components/feed/feed.component';
import { SearchPublishedReportsPageComponent } from './pages/search-published-reports-page/search-published-reports-page.component';
import { FavoriteFeedsPageComponent } from './pages/favorite-feeds-page/favorite-feeds-page.component';


@NgModule({
  declarations: [MyFeedsPageComponent, FeedComponent, SearchPublishedReportsPageComponent, FavoriteFeedsPageComponent],
    imports: [
        SharedModule,
        FeedsRoutingModule,
        InfiniteScrollModule,
        NgTruncatePipeModule,
    ]
})
export class FeedsModule {
}
