import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[formControl], [formControlName], [ngModel]',
  standalone: true
})
export class FormControlDirective {

  constructor(
    private readonly el: ElementRef
  ) {
  }

  focus() {

    const tagName = (this.el.nativeElement as HTMLElement).tagName;

    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      this.el.nativeElement.focus();
    } else {
      this.el.nativeElement.click();
    }
  }
}
