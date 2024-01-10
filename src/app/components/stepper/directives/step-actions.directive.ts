import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appStepActions]',
  standalone: true
})
export class StepActionsDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }
}
