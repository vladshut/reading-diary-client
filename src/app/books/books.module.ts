import { NgModule } from '@angular/core';
import { BooksListComponent } from './pages/books-list/books-list.component';
import {SharedModule} from "@app/shared/shared.module";
import {BooksRoutingModule} from "@app/books/books-routing.module";
import { AddBookPageComponent } from './pages/add-book-page/add-book-page.component';
import {AuthorsModule} from "@app/authors/authors.module";
import { UserBookItemComponent } from './component/user-book-item/user-book-item.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { UserBookListItemComponent } from './component/user-book-list-item/user-book-list-item.component';



@NgModule({
  declarations: [BooksListComponent, AddBookPageComponent, UserBookItemComponent, UserBookListItemComponent],
    imports: [
        SharedModule,
        BooksRoutingModule,
        AuthorsModule,
        AngularMultiSelectModule,
    ]
})
export class BooksModule { }
