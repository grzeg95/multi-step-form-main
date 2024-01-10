import {Directive, Host, HostListener} from '@angular/core';
import {StepperComponent} from '../components/stepper/stepper.component';

@Directive({
  selector: '[appStepperPrevious]',
  standalone: true
})
export class StepperPreviousDirective {

  constructor(
    @Host() private stepperComponent: StepperComponent
  ) {
  }

  @HostListener('click')
  handleClick() {
    this.stepperComponent?.goToPreviousStep();
  }
}
