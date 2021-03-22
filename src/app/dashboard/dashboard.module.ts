import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {DashboardRoutingModule} from "@app/dashboard/dashboard-routing.module";
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import {UserModule} from "@app/user/user.module";
import { TopLanguagesComponent } from './components/top-languages/top-languages.component';
import {TopStatusesComponent} from "@app/dashboard/components/top-statuses/top-statuses.component";
import {TopAuthorsComponent} from "@app/dashboard/components/top-authors/top-authors.component";


@NgModule({
  declarations: [DashboardPageComponent, TopLanguagesComponent, TopStatusesComponent, TopAuthorsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    UserModule,
  ]
})
export class DashboardModule {
}
