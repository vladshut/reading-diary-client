import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';
import { AuthGuard } from '../core/guards';
import { ContentLayoutComponent } from '../shared/layouts/content/content-layout.component';
import {FindUserPageComponent} from "./pages/find-user-page/find-user-page.component";
import {FollowersPageComponent} from "@app/follows/pages/followers-page/followers-page.component";
import {FolloweesPageComponent} from "@app/follows/pages/followees-page/followees-page.component";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], data: {sidebar: true}, children: [
      {path: 'followers', component: FollowersPageComponent},
      {path: 'followees', component: FolloweesPageComponent},
      {path: 'find', component: FindUserPageComponent},
    ]
  },
];

const CONTENT_ROUTES: Routes = [
];

const routes: Routes = [
  {path: '', component: FullLayoutComponent, children: FULL_ROUTES},
  {path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowsRoutingModule {}
