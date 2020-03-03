import {Directive, AfterViewInit, ElementRef, HostBinding, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Output() escapePressed = new EventEmitter();
  isFocused: boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
    this.isFocused = true;
  }

  @HostListener('focus', ['$event']) onFocus(e) {
    this.isFocused = true;
  }
  @HostListener('blur', ['$event']) onblur(e) {
    this.isFocused = false;
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape" && this.isFocused) {
      this.escapePressed.emit();
    }
  }
}
