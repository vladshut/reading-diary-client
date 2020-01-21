import {Constructor} from "@app/mixins/Constructor";
import {Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportItem} from "@app/models/report-item";
import {plainToClassFromExist} from "class-transformer";
import {ActionConfirmDialogComponent} from "@app/shared/components/action-confirm-dialog/action-confirm-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {validateAllFormFields} from "@app/shared/helpers/form.helper";

export function WithReportItem<T2 extends ReportItem, T extends Constructor<{}> = Constructor<{}>>(Base: T = (class {} as any))  {
  abstract class Temporary extends Base implements OnInit {
    @Input() item: T2;

    form: FormGroup;
    editMode = false;
    protected formBuilder: FormBuilder;
    protected ngbModal: NgbModal;

    ngOnInit() {
      if (this.item.isNew()) {
        this.editMode = true;
      }
      this.initForm();
    }

    onUpdate() {
      if (!this.form.valid) {
        return;
      }

      plainToClassFromExist(this.item, this.form.value);

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
    }

    onDelete() {
      const modalRef = this.ngbModal.open(ActionConfirmDialogComponent, {size: 'lg'});

      modalRef.componentInstance.text = 'Are you sure you want to delete this item?';
      modalRef.componentInstance.confirmed.subscribe(() => {
        this.item.delete();
      });}

    protected abstract initForm(): void;
  }

  return Temporary;
}
