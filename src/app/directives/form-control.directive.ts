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
    this.el.nativeElement.click();
  }
}
