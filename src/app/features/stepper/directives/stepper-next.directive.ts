import {Directive, Host, HostListener} from '@angular/core';
import {StepperComponent} from '../components/stepper/stepper.component';

@Directive({
  selector: '[appStepperNext]',
  standalone: true
})
export class StepperNextDirective {

  constructor(
    @Host() private stepperComponent: StepperComponent
  ) {
  }

  @HostListener('click')
  handleClick() {
    this.stepperComponent?.goToNextStep();
  }
}
