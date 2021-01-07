import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';
import { AuthGuard } from '../core/guards';
import { ContentLayoutComponent } from '../shared/layouts/content/content-layout.component';
import { ProfilePageComponent } from '@app/user/pages/profile-page/profile-page.component';

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], data: {sidebar: true}, children: [
      {path: 'settings', component: ProfilePageComponent},
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
export class UserRoutingModule {}
