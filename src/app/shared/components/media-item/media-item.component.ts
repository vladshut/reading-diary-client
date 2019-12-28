import { Component, Input, OnInit } from '@angular/core';
import { MediaItemInterface, ToMediaItem } from './media-item.interface';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {
  @Input() item: MediaItemInterface;
  @Input() withImage = true;
  @Input() size: 'sm'|'md'|'lg' = 'md';
  
  imageSize = 50;
  titleSize = 'font-medium-1';
  subTitleSize = 'font-small-3';
  
  constructor(
    private i18n: I18n
  ) {}

  ngOnInit() {
    if (this.size === 'sm') {
      this.imageSize = 30;
      this.titleSize = 'font-small-4';
      this.subTitleSize = 'font-small-2';
    }
    
    if ( typeof this.item['toMediaItem'] === 'function') {
      this.item = (<ToMediaItem>this.item).toMediaItem(this.i18n);
    }
  }
}
