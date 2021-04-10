import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../shared/layouts/full/full-layout.component';
import {AuthGuard} from '../core/guards';
import {ContentLayoutComponent} from '../shared/layouts/content/content-layout.component';
import {MyFeedsPageComponent} from "@app/feeds/pages/my-feeds-page/my-feeds-page.component";
import {SearchPublishedReportsPageComponent} from "@app/feeds/pages/search-published-reports-page/search-published-reports-page.component";
import {FavoriteFeedsPageComponent} from "@app/feeds/pages/favorite-feeds-page/favorite-feeds-page.component";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], data: {sidebar: true}, children: [
      {path: '', component: MyFeedsPageComponent},
      {path: 'published-reports', component: SearchPublishedReportsPageComponent},
      {path: 'favorites', component: FavoriteFeedsPageComponent},
    ]
  },
];

const CONTENT_ROUTES: Routes = [];

const routes: Routes = [
  {path: '', component: FullLayoutComponent, children: FULL_ROUTES},
  {path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule {
}
