import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Directive({
  selector: '[appShowItForRoles]'
})
export class ShowItForRolesDirective implements OnInit {
  private roles = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  @Input()
  set appShowItForRoles(val) {
    this.roles = val;
    this.updateView();
  }

  private updateView() {
    if (this.checkRoles()) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkRoles() {
    return false;
  }
}
