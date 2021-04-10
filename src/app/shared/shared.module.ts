import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MediaItemsGridComponent } from './components/media-items-grid/media-items-grid.component';
import { MediaItemComponent } from './components/media-item/media-item.component';
import { AvatarModule } from 'ngx-avatar';
import { NgBytesPipeModule, NgMathPipesModule, NgStringPipesModule} from 'angular-pipes';
import { ResponsiveModule } from 'ngx-responsive';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReadMoreDirective } from './directives/read-more.directive';
import { CurrPipe } from './pipes/curr.pipe';
import { PercPipe } from './pipes/perc.pipe';
import { HideItForRolesDirective } from './directives/hide-it-for-roles.directive';
import { ShowItForRolesDirective } from './directives/show-it-for-roles.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertComponent } from './components/alert/alert.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { ActionConfirmDialogComponent } from './components/action-confirm-dialog/action-confirm-dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ControlHtmlBuilderComponent } from './components/form/control-html-builder/control-html-builder.component';
import { ControlTextComponent } from './components/form/fields/control-text/control-text.component';
import { ControlSelectComponent } from './components/form/fields/control-select/control-select.component';
import { ControlPhoneComponent } from './components/form/fields/control-phone/control-phone.component';
import { ControlCountryComponent } from './components/form/fields/control-country/control-country.component';
import { ControlTextareaComponent } from './components/form/fields/control-textarea/control-textarea.component';
import { ControlCheckboxComponent } from './components/form/fields/control-checkbox/control-checkbox.component';
import { ControlFileComponent } from '@app/shared/components/form/fields/control-file/control-file.component';
import { ControlButtonComponent } from '@app/shared/components/form/fields/control-button/control-button.component';
import { SelectItemsModalComponent } from './components/select-items-modal/select-items-modal.component';
import { ControlModalSelectComponent } from '@app/shared/components/form/fields/control-modal-select/control-modal-select.component';
import { AttachmentListComponent } from './components/attachment-list/attachment-list.component';
import { AttachmentsCountComponent } from './components/attachments-count/attachments-count.component';
import { PropertyViewComponent } from './components/property-view/property-view.component';
import { ModalComponent } from './components/modal/modal.component';
import {NotificationSidebarComponent} from "@app/shared/components/notification-sidebar/notification-sidebar.component";
import {ToggleFullscreenDirective} from "@app/shared/directives/toggle-fullscreen.directive";
import { ControlLangComponent } from './components/form/fields/control-lang/control-lang.component';
import {FieldWrapperComponent} from "@app/shared/components/form/field-wrapper/field-wrapper.component";
import { AutofocusDirective } from './directives/autofocus.directive';
import {ShowItForAuthenticatedDirective} from "@app/shared/directives/show-it-for-authenticated.directive";
import {PDFExportModule} from "@progress/kendo-angular-pdf-export";
import {DragulaModule} from "ng2-dragula";
import {TextareaAutosizeModule} from "ngx-textarea-autosize";
import { ImageComponent } from './components/image/image.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import {DictPipe} from "@app/shared/pipes/dict.pipe";
import {SimpleNamePipe} from "@app/shared/pipes/simple-name.pipe";
import {TruncateMiddlePipe} from "@app/shared/pipes/truncate-middle.pipe";
import { ImageUploadModalComponent } from './components/image-upload-modal/image-upload-modal.component';

import {FilePondModule, registerPlugin} from "ngx-filepond";

import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview);

import * as FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
registerPlugin(FilePondPluginFileValidateSize);

import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
registerPlugin(FilePondPluginImageCrop);

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    AvatarModule,
    NgStringPipesModule,
    ResponsiveModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    FileUploadModule,
    NgMathPipesModule,
    NgBytesPipeModule,
    BsDropdownModule.forRoot(),
    PDFExportModule,
    DragulaModule.forRoot(),
    TextareaAutosizeModule,
    FilePondModule,
  ],
    exports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        AvatarModule,
        NgMathPipesModule,
        NgStringPipesModule,
        NgBytesPipeModule,
        ResponsiveModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule,
        NgSelectModule,
        NgxPaginationModule,
        BsDropdownModule,

        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ControlMessagesComponent,
        MediaItemsGridComponent,
        MediaItemComponent,
        AlertComponent,
        RefreshComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ActionConfirmDialogComponent,
        FileUploaderComponent,
        ControlHtmlBuilderComponent,
        NotificationSidebarComponent,
        ControlModalSelectComponent,
        SelectItemsModalComponent,
        AttachmentListComponent,
        AttachmentsCountComponent,
        PropertyViewComponent,
        ModalComponent,

        CurrPipe,
        PercPipe,

        ReadMoreDirective,
        ShowItForRolesDirective,
        ShowItForAuthenticatedDirective,
        HideItForRolesDirective,
        ToggleFullscreenDirective,
        FieldWrapperComponent,
        AutofocusDirective,
        ImageComponent,
        SimpleNamePipe,
        PageTitleComponent,
        ReadMoreComponent,
        SearchBarComponent,
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MediaItemsGridComponent,
    MediaItemComponent,
    ControlMessagesComponent,
    AlertComponent,
    RefreshComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    ActionConfirmDialogComponent,
    FileUploaderComponent,
    NotificationSidebarComponent,

    ReadMoreDirective,
    ShowItForRolesDirective,
    HideItForRolesDirective,
    ToggleFullscreenDirective,
    ShowItForAuthenticatedDirective,

    CurrPipe,
    PercPipe,
    DictPipe,
    SimpleNamePipe,
    TruncateMiddlePipe,

    FieldWrapperComponent,
    ControlHtmlBuilderComponent,
    ControlTextComponent,
    ControlSelectComponent,
    ControlPhoneComponent,
    ControlCountryComponent,
    ControlLangComponent,
    ControlTextareaComponent,
    ControlCheckboxComponent,
    ControlFileComponent,
    ControlButtonComponent,
    ControlModalSelectComponent,

    SelectItemsModalComponent,

    AttachmentListComponent,
    AttachmentsCountComponent,

    PropertyViewComponent,

    ModalComponent,

    AutofocusDirective,

    ImageComponent,

    ImageModalComponent,

    ImgFallbackDirective,

    ImageUploadModalComponent,

    PageTitleComponent,

    ReadMoreComponent,

    SearchBarComponent,
  ],
  entryComponents: [
    ImageModalComponent,
    SelectItemsModalComponent,
    ActionConfirmDialogComponent,
    ImageUploadModalComponent,
  ],
  providers: [
    CurrencyPipe,
    PercentPipe,
  ]
})
export class SharedModule {
}
