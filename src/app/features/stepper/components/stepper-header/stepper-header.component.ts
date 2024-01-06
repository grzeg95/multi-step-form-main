import {NgTemplateOutlet} from '@angular/common';
import {ChangeDetectionStrategy, Component, Host, Input, TemplateRef} from '@angular/core';
import {StepperComponent} from '../stepper/stepper.component';

@Component({
  selector: 'app-stepper-header',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './stepper-header.component.html',
  styleUrl: './stepper-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperHeaderComponent {

  @Input() customTemplate!: TemplateRef<any>;

  constructor(
    @Host() public stepperComponent: StepperComponent
  ) {
  }

  get labelTemplates() {
    return this.stepperComponent.stepsComponent.stepComponents.map((stepComponent) => stepComponent.appStepLabelTemplate);
  }
}
