import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appReadMore]'
})
export class ReadMoreDirective implements AfterViewInit, OnChanges {
  @Input('readMore-length') maxLength: number;
  @Input('readMore-element') elementChange: HTMLElement;
  
  private currentText: string;
  private hideToggle = true;
  private text: string;
  private isCollapsed = true;
  
  constructor(private el: ElementRef) {}
  
  /**
   * @inheritDoc
   */
  public ngAfterViewInit() {
    this.text = this.elementChange.innerHTML;
    
    this.toggleView();
    if (!this.hideToggle) {
      this.el.nativeElement.classList.remove('hidden');
    } else {
      this.el.nativeElement.classList.add('hidden');
    }
    this.el.nativeElement.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.toggleView();
    });
  }
  
  /**
   * @inheritDoc
   */
  public ngOnChanges() {
    if (this.text) {
      this.toggleView();
    }
  }
  
  /**
   * Toogle view - full text or not
   */
  private toggleView(): void {
    this.determineView();
    this.isCollapsed = !this.isCollapsed;
  
    if (this.text.length <= this.maxLength) {
      this.el.nativeElement.querySelector('.more').style.display = 'none';
      this.el.nativeElement.querySelector('.less').style.display = 'none';
    } else {
      if (this.isCollapsed) {
        this.el.nativeElement.querySelector('.more').style.display = 'none';
        this.el.nativeElement.querySelector('.less').style.display = 'inherit';
      } else {
        this.el.nativeElement.querySelector('.more').style.display = 'inherit';
        this.el.nativeElement.querySelector('.less').style.display = 'none';
      }
    }
  }
  
  /**
   * Determine view
   */
  private determineView(): void {
    const _elementChange = document.getElementById(this.elementChange.id);
    if (this.text.length <= this.maxLength) {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.text.substring(0, this.maxLength) + '...';
      _elementChange.innerHTML = this.currentText;
    } else if (this.isCollapsed === false) {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
    }
  }
}
