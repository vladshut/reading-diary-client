import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicReportPageComponent} from "@app/public-report/pages/public-report-page/public-report-page.component";
import {ContentLayoutComponent} from "@app/shared/layouts/content/content-layout.component";

const CONTENT_ROUTES: Routes = [
  {
    path: '', canActivate: [], children: [
      {path: ':publicKey', component: PublicReportPageComponent },
    ]
  },
];

const routes: Routes = [
  {path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicReportRoutingModule {}
