import { NgModule } from '@angular/core';
import { ReadingReportPageComponent } from './pages/reading-report-page/reading-report-page.component';
import {ReadingReportRoutingModule} from "@app/reading-report/reading-report-routing.module";
import {SharedModule} from "@app/shared/shared.module";
import { SectionItemComponent } from './pages/reading-report-page/section-item/section-item.component';
import { SectionsListComponent } from './pages/reading-report-page/sections-list/sections-list.component';
import { SectionReportComponent } from './pages/reading-report-page/section-report/section-report.component';
import { SectionReportBlockComponent } from './pages/reading-report-page/section-report-block/section-report-block.component';
import { ReportItemComponent } from './components/report-items/report-item/report-item.component';
import { ReportItemTermComponent } from './components/report-items/report-item-term/report-item-term.component';
import { ReportItemGoalComponent } from './components/report-items/report-item-goal/report-item-goal.component';
import { ReportItemQuoteComponent } from './components/report-items/report-item-quote/report-item-quote.component';
import { ReportItemQuestionComponent } from './components/report-items/report-item-question/report-item-question.component';
import { ReportItemResumeComponent } from './components/report-items/report-item-resume/report-item-resume.component';
import { ReportItemReferenceComponent } from './components/report-items/report-item-reference/report-item-reference.component';
import { ReportItemInformationEvaluationComponent } from './components/report-items/report-item-information-evaluation/report-item-information-evaluation.component';
import { ReportItemReviewComponent } from './components/report-items/report-item-review/report-item-review.component';
import { ReportItemRatingComponent } from './components/report-items/report-item-rating/report-item-rating.component';
import { ReportItemForwardResearchComponent } from './components/report-items/report-item-forward-research/report-item-forward-research.component';
import {NgxStarsModule} from "ngx-stars";
import { CompletedReportPageComponent } from './pages/completed-report-page/completed-report-page.component';
import { CompletedReportSectionItemComponent } from './pages/completed-report-page/completed-report-section-item/completed-report-section-item.component';
import { ManagePublicAccessModalComponent } from './modals/manage-public-access-modal/manage-public-access-modal.component';
import { ReportItemActionsComponent } from './components/report-items/report-item-actions/report-item-actions.component';
import {PDFExportModule} from "@progress/kendo-angular-pdf-export";



@NgModule({
  declarations: [ReadingReportPageComponent, SectionItemComponent, SectionsListComponent, SectionReportComponent, SectionReportBlockComponent, ReportItemComponent, ReportItemTermComponent, ReportItemGoalComponent, ReportItemQuoteComponent, ReportItemQuestionComponent, ReportItemResumeComponent, ReportItemReferenceComponent, ReportItemInformationEvaluationComponent, ReportItemReviewComponent, ReportItemRatingComponent, ReportItemForwardResearchComponent, CompletedReportPageComponent, CompletedReportSectionItemComponent, ManagePublicAccessModalComponent, ReportItemActionsComponent],
  exports: [
    CompletedReportSectionItemComponent
  ],
    imports: [
        SharedModule,
        ReadingReportRoutingModule,
        NgxStarsModule,
        PDFExportModule,
    ],
  entryComponents: [
    ManagePublicAccessModalComponent,
  ],
})
export class ReadingReportModule { }
