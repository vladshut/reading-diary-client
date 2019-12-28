import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Directive({
  selector: '[appHideItForRoles]'
})
export class HideItForRolesDirective implements OnInit {
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
  set appHideItForRoles(val) {
    this.roles = val;
    this.updateView();
  }

  private updateView() {
    if (!this.checkRoles()) {
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
