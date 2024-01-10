import {ContentChildren, Directive, QueryList} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FormControlDirective} from './form-control.directive';

@Directive({
  selector: '[appAbstractControlActions]',
  standalone: true,
  providers: [NgForm]
})
export class AbstractControlActionsDirective {

  @ContentChildren(FormControlDirective, {descendants: true}) formControlDirectives!: QueryList<FormControlDirective>;

  focus(index: number) {
    this.formControlDirectives.toArray()[index].focus();
  }
}
