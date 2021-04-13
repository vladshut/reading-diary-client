import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {WithReportItem} from "@app/mixins/WithReportItem";
import {ReportItemFigure} from "@app/models/report-item";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "@app/core/services/alert.service";
import { env } from '@env/env';
import {getInputValueByName} from "@app/shared/helpers/functions.helper";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";

@Component({
  selector: 'app-report-item-figure',
  templateUrl: './report-item-figure.component.html',
  styleUrls: ['./report-item-figure.component.css']
})
export class ReportItemFigureComponent extends WithReportItem(ReportItemFigure) implements OnInit {
  @Input() item: ReportItemFigure;
  @Input() withActions: boolean;

  hover = false;

  @ViewChild('figureUpload', {static: false}) myPond: any;

  pondOptions = null;

  pondFiles = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected ngbModal: NgbModal,
    protected alertService: AlertService,
    protected transl: TranslationService,
  ) {
    super();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      figure: [this.item ? this.item.figure : null, Validators.required],
      figure_caption: [this.item ? this.item.figure_caption : null, Validators.required],
    });

    this.hover = false;
  }

  ngOnInit() {
    super.ngOnInit();

    this.pondOptions = {
      name: this.getFilePondName(),
      class: 'my-filepond',
      maxFileSize: '1MB',
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      multiple: false,
      labelIdle: 'Drop files here',
      server: {
        url: `${env.apiHost}/api/files`,
        process: '/process',
        revert: '/process',
      },
    };
  }

  onProcessFile($event: any) {
    console.log(this.getFilePondValue());
    this.form.controls.figure.setValue(this.getFilePondValue());
  }

  getFilePondName() {
    return 'figure_' + this.item.id;
  }

  getFilePondValue(): string|undefined {
    return getInputValueByName(this.getFilePondName());
  }

  onCancelEdit() {
    if (this.myPond && this.isCreating) {
      this.myPond.removeFiles({revert: true});
    }

    super.onCancelEdit();
  }
}
