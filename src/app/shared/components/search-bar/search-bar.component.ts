import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() minQueryLength: number = 0;
  @Input() query: string = '';
  @Input() placeholder: string = '';
  @Input() resettable: boolean = false;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    if (!this.isSearchable()) {
      return;
    }

    this.search.emit(this.preparedQuery);
  }

  onReset() {
    this.query = '';
    this.reset.emit();
  }

  isSearchable(): boolean {
    return this.preparedQuery.length > this.minQueryLength;
  }

  showReset(): boolean {
    return this.resettable && this.preparedQuery.length > 0;
  }

  private get preparedQuery(): string {
    if (!this.query) {
      return '';
    }

    return this.query.trimChars(' ');
  }
}
