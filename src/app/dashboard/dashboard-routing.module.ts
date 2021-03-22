import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/core/guards";
import {DashboardPageComponent} from "@app/dashboard/pages/dashboard-page/dashboard-page.component";
import {FullLayoutComponent} from "@app/shared/layouts/full/full-layout.component";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', component: DashboardPageComponent},
    ]
  },
];

const routes: Routes = [
  {path: '', component: FullLayoutComponent, children: FULL_ROUTES},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
