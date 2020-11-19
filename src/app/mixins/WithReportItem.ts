import {Constructor} from "@app/mixins/Constructor";
import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportItem} from "@app/models/report-item";
import {plainToClassFromExist} from "class-transformer";
import {ActionConfirmDialogComponent} from "@app/shared/components/action-confirm-dialog/action-confirm-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {validateAllFormFields} from "@app/shared/helpers/form.helper";
import {AlertService} from "@app/core/services/alert.service";
import {copyToClipboard} from "@app/shared/helpers/functions.helper";

export function WithReportItem<T2 extends ReportItem, T extends Constructor<{}> = Constructor<{}>>(Base: T = (class {} as any))  {
  abstract class Temporary extends Base implements OnInit {
    @Input() item: T2;
    @Output() editingCancelled = new EventEmitter<ReportItem>();

    form: FormGroup;
    editMode = false;
    protected alertService: AlertService;
    protected formBuilder: FormBuilder;
    protected ngbModal: NgbModal;

    ngOnInit() {
      if (this.item.isNew()) {
        this.editMode = true;
      }
      this.initForm();
    }

    canBeUpdated() {
      return this.form.valid && this.form.dirty;
    }

    onUpdate() {
      if (!this.canBeUpdated()) {
        return;
      }

      const formValue = this.form.value;
      Object.keys(formValue).forEach(k => {
        if (typeof formValue[k] == 'string') {
          formValue[k] = formValue[k].trim().replace(/(?:(?:\r\n|\r|\n)\s*){2}/s, '\n\n');
        }
      });

      plainToClassFromExist(this.item, formValue);

      this.editMode = false;
      this.item.markAsNeedUpdate();
      this.initForm();
    }

    onCancelEdit() {
      this.initForm();

      validateAllFormFields(this.form);
      this.form.updateValueAndValidity();

      if (this.form.valid) {
        this.editMode = false;
      }

      console.log(this.item.isNew(), this.item.isNeedUpdate());

      if (this.item.isNew()) {
        this.item.delete();
      }
    }

    onDelete() {
      const modalRef = this.ngbModal.open(ActionConfirmDialogComponent, {size: 'lg'});

      modalRef.componentInstance.text = 'Are you sure you want to delete this item?';
      modalRef.componentInstance.confirmed.subscribe(() => {
        this.item.delete();
      });}

    protected abstract initForm(): void;


    onCopy() {
      copyToClipboard(this.item.asFormattedString);

      if (this.alertService) {
        this.alertService.info('Copied to clipboard');
      }
    }

    onSwitchVisibility() {
      this.item.switchPrivacy();
    }

    onSwitchFavorite() {
      this.item.switchFavorite();
    }
  }

  return Temporary;
}
