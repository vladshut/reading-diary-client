import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import {isString} from "util";

@Directive({
  selector: '[appShowItForAuthenticated]'
})
export class ShowItForAuthenticatedDirective implements OnInit {
  private roles = [];

  @Input('appShowItForAuthenticated') as: string|string[];

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
    this.viewContainer.clear();

    if (!this.auth.isAuthenticated()) {
      return;
    }

    if (typeof this.as === 'string') {
      this.as = [this.as];
    }

    if (this.as && this.as.indexOf && this.as.indexOf(this.auth.getUser().id) === -1) {
      return;
    }

    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
