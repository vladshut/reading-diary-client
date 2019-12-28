import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorFormModalComponent } from './modals/author-form-modal/author-form-modal.component';
import {SharedModule} from "@app/shared/shared.module";



@NgModule({
  declarations: [
    AuthorFormModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    AuthorFormModalComponent,
  ],
  exports: [
    AuthorFormModalComponent,
  ]
})
export class AuthorsModule { }
