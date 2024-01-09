import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  effect,
  ElementRef,
  Signal,
  signal,
  TemplateRef
} from '@angular/core';
import {StepActionsDirective} from '../../directives/step-actions.directive';
import {StepComponent} from '../step/step.component';
import {StepsComponent} from '../steps/steps.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit {

  @ContentChild(StepsComponent) private stepsComponent!: StepsComponent;
  private _step = signal<number | undefined>(undefined);
  private _previousStep = signal(0);
  private _size = signal(0);
  private _currentStepComponent = signal<StepComponent | undefined>(undefined);
  private _currentStepActionsRef = signal<TemplateRef<StepActionsDirective> | null>(null)

  get stepComponents() {
    return this.stepsComponent.stepComponents;
  }

  get currentStepActionsRef() {
    return this._currentStepActionsRef.asReadonly();
  }

  get step() {
    return this._step;
  }

  setStep(index: number) {

    const step = this.step();

    if (step === undefined) {
      if (this._size() - 1 >= index || index < 0) {
        this._step.set(0);
        this._previousStep.set(0);
      } else {
        this._step.set(index);
        this._previousStep.set(index);
      }
    }
    else if (this._size() - 1 >= index) {

      if (index > step) {

        for (let i = step; i < index; ++i) {

          const stepComponent = this.stepsComponent.stepComponents.get(i);

          if (stepComponent) {
            stepComponent.updateValueAndValidity();

            if (!stepComponent.valid) {
              this._previousStep.set(step);
              this._step.set(i);
              return;
            }
          }
        }

        this._previousStep.set(step);
        this._step.set(index);

      } else if (index >= 0) {
        this._previousStep.set(step);
        this._step.set(index);
      }
    }
  }

  constructor(
    private el: ElementRef
  ) {
    effect(() => {
      this.stepComponents.get(this._previousStep())?.hide();
      const currentStepComponent = this.stepComponents.get(this._step() || 0);
      currentStepComponent?.show();
      this._currentStepComponent.set(currentStepComponent);
      this._currentStepActionsRef.set(currentStepComponent?.stepActionsDirective?.templateRef || null);
    }, {allowSignalWrites: true});
  }

  goToNextStep() {
    this.setStep((this._step() || 0) + 1);
  }

  goToPreviousStep() {
    this.setStep((this._step() || 0) - 1);
  }

  scrollToTop() {
    (this.el.nativeElement as HTMLElement).scrollTo({behavior: 'smooth', top: 0});
  }

  ngAfterContentInit(): void {
    this._size.set(this.stepComponents.length);
    this.stepComponents.forEach((stepComponent) => stepComponent.hide());
    this.setStep(0);
  }
}
