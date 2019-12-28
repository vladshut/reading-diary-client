import { Component, Input, OnInit } from '@angular/core';
import { MediaItemInterface, ToMediaItem } from '../media-item/media-item.interface';
import { strcmp } from '../../helpers/functions.helper';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-media-items-grid',
  templateUrl: './media-items-grid.component.html',
  styleUrls: ['./media-items-grid.component.css']
})
export class MediaItemsGridComponent implements OnInit {
  @Input() items: MediaItemInterface[] | ToMediaItem[] = [];
  @Input() columns = 3;
  
  _items: MediaItemInterface[] = [];
  
  constructor(
    private i18n: I18n
  ) {}

  ngOnInit() {}
  
  getItems() {
    this.prepareItems();
    this.sortItems();
    
    return this._items;
  }
  
  private sortItems() {
    this._items.sort((itemA, itemB) => {
      if (itemA.title && itemB.title) {
        return strcmp(itemA.title, itemB.title);
      } else if (itemA.title && !itemB.title) {
        return -1;
      } else if (!itemA.title && itemB.title) {
        return 1;
      } else {
        if (itemA.subTitle && itemB.subTitle) {
          return strcmp(itemA.subTitle, itemB.subTitle);
        } else if (itemA.title && !itemB.title) {
          return 1;
        } else if (!itemA.title && itemB.title) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }
  
  private prepareItems() {
    const newItems = [];
  
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      
      if ( typeof item['toMediaItem'] === 'function') {
        item = (<ToMediaItem>item).toMediaItem(this.i18n);
      }
      
      newItems.push(item);
    }
    
    this._items = newItems;
  }
}
