import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appRemoveExtraLinebreaks]'
})
export class RemoveExtraLinebreaksDirective {

  constructor() {
  }

  @HostListener('paste', ['$event']) formatPastedContent(e: ClipboardEvent) {
    e.preventDefault();

    let text = '';
    if (e.clipboardData) {
      text = e.clipboardData.getData('text/plain');
    } else if (window['clipboardData']) {
      text = window['clipboardData'].getData('Text');
    }

    // strip line breaks here...
    text = text.replace(/([a-zA-Z])(\r?\n|\r)([a-zA-Z])/g, "$1 $3");

    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
  }
}
