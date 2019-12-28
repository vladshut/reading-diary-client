import {Constructor} from "@app/mixins/Constructor";
import {ChangeDetectorRef} from "@angular/core";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

export function WithLoading<T extends Constructor<{}>>(Base: T = (class {} as any)) {
  return class extends Base {
    private loading = 0;
    protected cdr: ChangeDetectorRef;

    startLoading(): void {
      this.loading ++;

      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }

    stopLoading(): void {
      this.loading --;

      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }

    isLoading(): boolean {
      return this.loading > 0;
    }

    withLoading(observable: Observable<any>): Observable<any> {
      this.startLoading();

      return observable.pipe(finalize(() => this.stopLoading()));
    }
  }
}
