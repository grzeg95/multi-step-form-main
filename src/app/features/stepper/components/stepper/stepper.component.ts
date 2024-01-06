import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  effect,
  Signal,
  signal
} from '@angular/core';
import {StepsComponent} from '../steps/steps.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit {

  @ContentChild(StepsComponent) stepsComponent!: StepsComponent;
  _step = signal(0);
  _previousStep = signal(0);
  _size = signal(0);

  get step(): Signal<number> {
    return this._step.asReadonly();
  }

  setStep(index: number) {

    if (this._size() - 1 >= index) {

      if (index > this.step()) {

        for (let i = this.step(); i < index; ++i) {

          const stepComponent = this.stepsComponent.stepComponents.get(i);

          if (stepComponent) {
            stepComponent.updateValueAndValidity();

            if (!stepComponent.valid) {
              this._step.set(i);
              this._previousStep.set(index);
              return;
            }
          }
        }

        this._previousStep.set(this.step());
        this._step.set(index);

      } else if (index >= 0) {
        this._previousStep.set(this.step());
        this._step.set(index);
      }
    }
  }

  constructor() {
    effect(() => {
      this.stepsComponent.stepComponents.get(this._previousStep())?.hide();
      this.stepsComponent.stepComponents.get(this.step())?.show();
    });
  }

  goToNextStep() {
    this.setStep(this.step() + 1);
  }

  goToPreviousStep() {
    this.setStep(this.step() - 1);
  }

  ngAfterContentInit(): void {
    this._size.set(this.stepsComponent.stepComponents.length);
    this.stepsComponent.stepComponents.forEach((stepComponent) => stepComponent.hide());
  }
}
