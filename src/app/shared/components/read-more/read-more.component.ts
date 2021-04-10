import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {I18n} from "@ngx-translate/i18n-polyfill";

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})

export class ReadMoreComponent implements OnChanges {
  @Input() text: string;
  @Input() maxLength: number = 100;
  currentText: string;
  hideToggle: boolean = true;

  public isCollapsed: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private i18n: I18n,
  ) {}

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed == true) {
      this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else if(this.isCollapsed == false)  {
      this.currentText = this.text;
    }
  }

  ngOnChanges() {
    this.determineView();
  }

  linkText() {
    const readLess = this.i18n({id: 'actions.show_less', value: 'Less'});
    const readMore = this.i18n({id: 'actions.show_more', value: 'More'});

    return this.isCollapsed ? readMore : readLess;
  }
}
