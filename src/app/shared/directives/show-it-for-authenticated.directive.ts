import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Directive({
  selector: '[appShowItForAuthenticated]'
})
export class ShowItForAuthenticatedDirective implements OnInit {
  private roles = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    if (this.auth.isAuthenticated()) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
