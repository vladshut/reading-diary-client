import {Component, OnInit} from '@angular/core';
import {WithLoading} from "@app/mixins/WithLoading";
import {UserBook} from "@app/models/user-book";
import {BookService} from "@app/core/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookSectionService} from "@app/core/services/book-section.service";
import {BookSection} from "@app/models/book-section";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ManagePublicAccessModalComponent} from "@app/reading-report/modals/manage-public-access-modal/manage-public-access-modal.component";
import {ActionConfirmDialogComponent} from "@app/shared/components/action-confirm-dialog/action-confirm-dialog.component";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {AlertService} from "@app/core/services/alert.service";
import {AuthService} from "@app/core/services/auth.service";

@Component({
  selector: 'app-completed-report-page',
  templateUrl: './completed-report-page.component.html',
  styleUrls: ['./completed-report-page.component.css']
})
export class CompletedReportPageComponent extends WithLoading() implements OnInit {
  deep = 0;
  userBookId: string;
  userBook: UserBook;
  section: BookSection;
  userId: string;
  withActions: boolean = false;

  constructor(
    private bookService: BookService,
    private sectionService: BookSectionService,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private i18n: I18n,
    private router: Router,
    private alertService: AlertService,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.userId = this.auth.getUser().id;
    this.userBookId = this.route.snapshot.paramMap.get('userBookId');

    const book$ = this.bookService.get(this.userBookId);
    this.withLoading(book$).subscribe(ub => {
      this.userBook = ub;

      this.withActions = this.userBook.user.id === this.userId;

      if (this.userBook.user.id !== this.userId) {
        this.router.navigate(['/books/list']);
      }
    });

    const section$ = this.sectionService.list(this.userBookId);
    this.withLoading(section$).subscribe(section => {
      console.log(section);
      this.section = section;
    });
  }

  makePublic() {
    const makePublic$ = this.bookService.makePublic(this.userBook);
    this.withLoading(makePublic$).subscribe(b => {
      this.userBook.report_public_key = b.report_public_key;

      this.openManageAccessModal();
    });
  }

  openManageAccessModal() {
    const modalRef = this.modal.open(ManagePublicAccessModalComponent, {size: 'lg'});
    const component = <ManagePublicAccessModalComponent>modalRef.componentInstance;

    component.userBook = this.userBook;
    component.closePublicAccess.subscribe(() => {
      this.modal.dismissAll();
      const makePrivate$ = this.bookService.makePrivate(this.userBook);
      this.withLoading(makePrivate$).subscribe(b => {
        this.userBook.report_public_key = null;
      });

    });
  }

  onSectionSelected(bs: BookSection) {
    const el = document.getElementById('section_' + bs.id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  resumeReading() {
    const modalRef = this.modalService.open(ActionConfirmDialogComponent, {size: 'lg'});
    modalRef.componentInstance.text = this.i18n({
      value: 'Do you really want to resume reading this book?',
      id: 'resume_reading_confirmation'
    });

    modalRef.componentInstance.confirmed.subscribe(() => {
      const resumeReading$ = this.bookService.resumeReading(this.userBook);
      this.withLoading(resumeReading$).subscribe(ub => this.router.navigate([`/reading-report/` + ub.id]));
    });
  }

  share() {
    const $publish = this.bookService.publish(this.userBook);

    this.withLoading($publish).subscribe(userBook => {
      this.userBook = userBook;
      this.alertService.success();
    });
  }

  unshare() {
    const $unpublish = this.bookService.unpublish(this.userBook);

    this.withLoading($unpublish).subscribe(userBook => {
      this.userBook = userBook;
      this.alertService.success();
    });
  }
}
