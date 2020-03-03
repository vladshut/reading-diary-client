import { NgModule } from '@angular/core';
import {SharedModule} from "@app/shared/shared.module";
import {PublicReportRoutingModule} from "@app/public-report/public-report-routing.module";
import {PublicReportPageComponent} from "@app/public-report/pages/public-report-page/public-report-page.component";
import {ReadingReportModule} from "@app/reading-report/reading-report.module";
import {PDFExportModule} from "@progress/kendo-angular-pdf-export";



@NgModule({
  declarations: [
    PublicReportPageComponent,
  ],
  imports: [
    SharedModule,
    PublicReportRoutingModule,
    ReadingReportModule,
    PDFExportModule,
  ]
})
export class PublicReportModule { }
