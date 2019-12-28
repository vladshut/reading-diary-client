import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards';
import { FullLayoutComponent } from '@app/shared/layouts/full/full-layout.component';
import {BooksListComponent} from "@app/books/pages/books-list/books-list.component";
import {AddBookPageComponent} from "@app/books/pages/add-book-page/add-book-page.component";

const FULL_ROUTES: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: 'list', component: BooksListComponent},
      {path: 'add', component: AddBookPageComponent},
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
export class BooksRoutingModule {}
