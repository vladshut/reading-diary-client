import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IsbnValidator} from "@app/shared/validators/isbn.validator";
import {DictionaryService, GENRES} from "@app/core/services/dictionary.service";
import {BookService} from "@app/core/services/book.service";
import {AuthorService} from "@app/core/services/author.service";
import {Observable, of} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthorFormModalComponent} from "@app/authors/modals/author-form-modal/author-form-modal.component";
import {Dictionary} from "@app/models/dictionary";
import {validateAllFormFields} from "@app/shared/helpers/form.helper";
import {AlertService} from "@app/core/services/alert.service";
import {Router} from "@angular/router";
import {Book} from "@app/models/book";
import {Author} from "@app/models/author";

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookPageComponent implements OnInit {
  form: FormGroup;
  formExisting: FormGroup;
  authors$: Observable<Author[]>;
  genres: Dictionary[] = [];
  loading = 0;
  books$: Observable<Book[]>;

  private allowedFileTypes = ['image/gif', 'image/jpeg', 'image/png'];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private dictionaryService: DictionaryService,
    private modal: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.authors$ = of([]);

    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      year: [null, [Validators.required, Validators.min(0), Validators.max(new Date().getFullYear())]],
      lang: [null, [Validators.required]],
      cover: [null, [Validators.required]],
      author_id: [null, [Validators.required]],
      genres: [[], [Validators.required]],
      pages: [null, [Validators.required, Validators.min(0), Validators.max(9999)]],
      isbn10: [null, [IsbnValidator(10)]],
      isbn13: [null, [IsbnValidator(13)]],
      description: [null, []],
    });

    this.formExisting = this.formBuilder.group({
      search: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.genres = this.dictionaryService.list(GENRES);
  }

  onSubmit() {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.form);
      return;
    }

    const formData = this.form.value;


    this.requestStarted();

    this.bookService.addNew(formData).subscribe(author => {
      this.alertService.created();
      this.requestFinished();
      this.router.navigate(['/books']);
    });
  }

  get f () {
    return this.form.controls;
  }

  get fe () {
    return this.formExisting.controls;
  }

  onExistingSubmit() {
    this.formExisting.updateValueAndValidity();

    if (this.formExisting.invalid) {
      this.alertService.formError();
      validateAllFormFields(this.formExisting);
      return;
    }

    const bookId = this.formExisting.value.search;

    this.requestStarted();

    this.bookService.addExisting({book_id: bookId}).subscribe(author => {
      this.alertService.created();
      this.requestFinished();
      this.router.navigate(['/books']);
    });
  }

  onAddAuthor() {
    const modalRef = this.modal.open(AuthorFormModalComponent, {size: 'lg'});

    const component = <AuthorFormModalComponent>modalRef.componentInstance;

    component.created.subscribe(author => console.log(author));
  }

  searchAuthor(e: {term: string, items: []}) {
    if (e.term.length < 3) {
      this.authors$ = of([]);
    } else {
      this.authors$ = this.authorService.search(e.term);
    }
  }

  searchBook(e: { term: string; items: any[] }) {
    if (e.term.length < 3) {
      this.books$ = of([]);
    } else {
      this.books$ = this.bookService.search(e.term);
    }
  }

  private requestStarted() {
    this.loading ++;
    this.cdr.detectChanges();
  }

  private requestFinished() {
    this.loading --;
    this.cdr.detectChanges();
  }

  uploadFile(event) {
    const rawFiles = (event.target as HTMLInputElement).files;
    const filesArr = (<File[]>Array.from(rawFiles)).filter(f => this.isFileTypeValid(f));

    if (filesArr.length === 0) {
      return;
    }

    this.form.patchValue({cover: filesArr[0]});
    this.form.get('cover').updateValueAndValidity()
  }

  private isFileTypeValid(file: File): boolean {
    if (this.allowedFileTypes.length === 0) {
      return true;
    }

    return this.allowedFileTypes.includes(file['type']);
  }
}
