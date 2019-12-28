import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isObservable, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import uuidv4 from "uuid/v4";

export class SelectItem {
  id = uuidv4();
  name: string;
  subName?: string;
  value: any;
}

@Component({
  selector: 'app-select-items-modal',
  templateUrl: './select-items-modal.component.html',
  styleUrls: ['./select-items-modal.component.css']
})
export class SelectItemsModalComponent implements OnInit {
  @Input() items: SelectItem[] | Observable<SelectItem[]> = [];
  @Input() selectedItems: SelectItem[] = [];
  @Input() disabledItems: SelectItem[] = [];
  @Input() onItemCreate: () => Observable<SelectItem[]>;

  @Output() selected = new EventEmitter<SelectItem[]>();

  loading = 0;
  _items: SelectItem[] = [];

  constructor(
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    if (isObservable(this.items)) {
      this.loading ++;
      this.items.pipe(finalize(() => this.loading --))
        .subscribe(items => this._items = items);
    } else {
      this._items = this.items;
    }
  }

  onSelectedChange(item: SelectItem) {
    if (this.isDisabled(item)) {
      return;
    }

    const selectedIndex = this.findItemIndexInSelectedItems(item);
    if (selectedIndex === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(selectedIndex, 1);
    }
  }

  onClose() {
    this.activeModal.close();
  }

  onSelect() {
    this.selected.emit(this.selectedItems);
    this.activeModal.close();
  }

  isSelected(item: SelectItem) {
    return this.findItemIndexInSelectedItems(item) !== -1;
  }

  isDisabled(item: SelectItem) {
    return this.disabledItems.findIndex(i => i.id === item.id) !== -1;
  }

  private findItemIndexInSelectedItems(item: SelectItem) {
    return this.selectedItems.findIndex(i => i.id === item.id);
  }

  onItemCreateClicked() {
    if (this.onItemCreate) {
      this.onItemCreate().subscribe(items => this._items.push(...items));
    }
  }
}
