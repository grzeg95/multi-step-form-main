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
export class StepperComponent implements AfterContentInit, AfterContentChecked {

  @ContentChild(StepsComponent) private stepsComponent!: StepsComponent;
  private _step = signal(0);
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
              this._previousStep.set(this.step());
              this._step.set(i);
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

  constructor(
    private el: ElementRef
  ) {
    effect(() => {
      this.stepComponents.get(this._previousStep())?.hide();
      const currentStepComponent = this.stepComponents.get(this.step());
      currentStepComponent?.show();
      this._currentStepComponent.set(currentStepComponent);
    }, {allowSignalWrites: true});
  }

  goToNextStep() {
    this.setStep(this.step() + 1);
  }

  goToPreviousStep() {
    this.setStep(this.step() - 1);
  }

  scrollToTop() {
    (this.el.nativeElement as HTMLElement).scrollTo({behavior: 'smooth', top: 0});
  }

  ngAfterContentInit(): void {
    this._size.set(this.stepComponents.length);
    this.stepComponents.forEach((stepComponent) => stepComponent.hide());
  }

  ngAfterContentChecked(): void {
    this._currentStepActionsRef.set(this._currentStepComponent()?.stepActionsDirective?.templateRef || null);
  }
}
