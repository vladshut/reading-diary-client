import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards';
import { FullLayoutComponent } from '@app/shared/layouts/full/full-layout.component';
import {ReadingReportPageComponent} from "@app/reading-report/pages/reading-report-page/reading-report-page.component";
import {CompletedReportPageComponent} from "@app/reading-report/pages/completed-report-page/completed-report-page.component";
import {PublishedReportComponent} from "@app/reading-report/pages/published-report/published-report.component";
import {CanDeactivateGuard} from "@app/core/guards/can-deactivate.guard";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: ':userBookId', component: ReadingReportPageComponent},
      {path: 'completed/:userBookId', component: CompletedReportPageComponent},
      {path: 'published/:userBookId', component: PublishedReportComponent},
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
export class ReadingReportRoutingModule {}
