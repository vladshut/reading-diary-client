import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { AuthGuard } from '../core/guards';
import { ActionConfirmDialogComponent } from './components/action-confirm-dialog/action-confirm-dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { SelectItemsModalComponent } from '@app/shared/components/select-items-modal/select-items-modal.component';

const FULL_ROUTES: Routes = [
    {
        path: '', canActivate: [AuthGuard], children: [
            {path: 'modal/action-confirmation', component: ActionConfirmDialogComponent },
            {path: 'modal/upload', component: FileUploaderComponent },
            {path: 'modal/select-items', component: SelectItemsModalComponent },
        ]
    },
];

const CONTENT_ROUTES: Routes = [
    {path: 'refresh', component: RefreshComponent},
];

const routes: Routes = [
    {path: '', component: FullLayoutComponent, children: FULL_ROUTES},
    {path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {}
