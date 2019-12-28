import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards';
import { FullLayoutComponent } from '@app/shared/layouts/full/full-layout.component';
import {ReadingReportPageComponent} from "@app/reading-report/pages/reading-report-page/reading-report-page.component";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: ':userBookId', component: ReadingReportPageComponent},
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
