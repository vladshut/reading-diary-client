import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem, SelectItemsModalComponent } from '@app/shared/components/select-items-modal/select-items-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-control-modal-select',
  templateUrl: './control-modal-select.component.html',
  styleUrls: ['./control-modal-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlModalSelectComponent),
    multi: true,
  }],
})
export class ControlModalSelectComponent implements OnInit, ControlValueAccessor {
  @Input() class = '';
  @Input() items: SelectItem[] | Observable<SelectItem[]> = [];
  @Input() disabledItems: SelectItem[] = [];
  @Input() actionName: string;
  @Input() showSelected = true;
  @Input() onItemCreate: () => Observable<SelectItem[]>;
  @Input() btnSize = 'sm';
  
  @Output() changed = new EventEmitter<any[]>();
  
  selectedItems: SelectItem[] = [];
  onChangeFn;
  onTouchedFn;
  isDisabled = false;
  loading = 0;
  
  constructor(
    private ngbModal: NgbModal,
  ) {}
  
  ngOnInit(): void {}
  
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  
  writeValue(value: SelectItem[]): void {
    this.selectedItems = value || [];
  }
  
  onRemove(item: SelectItem) {
    if (this.disabledItems.indexOf(item) !== -1) {
      return;
    }
    
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.emitChange();
  }
  
  selectItems() {
    const modalRef = this.ngbModal.open(SelectItemsModalComponent, {size: 'lg'});
    const comp = <SelectItemsModalComponent>modalRef.componentInstance;
    comp.items = this.items;
    comp.selectedItems = this.selectedItems.slice();
    comp.disabledItems = this.disabledItems.slice();
    comp.onItemCreate = this.onItemCreate;
    comp.selected.subscribe(selectedItems => {
      this.selectedItems = selectedItems || [];
      this.emitChange();
    });
  }
  
  private emitChange() {
    const values = this.getSelectedValues();
    this.onTouchedFn(values);
    this.onChangeFn(values);
    this.changed.emit(values);
  }
  
  private getSelectedValues(): any[] {
    return this.selectedItems.map(i => i.value);
  }
}
