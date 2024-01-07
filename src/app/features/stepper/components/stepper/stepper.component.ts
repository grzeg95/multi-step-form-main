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
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit, AfterContentChecked {

  @ContentChild(StepsComponent) stepsComponent!: StepsComponent;
  _step = signal(0);
  _previousStep = signal(0);
  _size = signal(0);
  currentStepComponent = signal<StepComponent | undefined>(undefined);
  currentStepActionsRef = signal<TemplateRef<StepActionsDirective> | null>(null)

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

  constructor(
    private el: ElementRef
  ) {
    effect(() => {
      this.stepsComponent.stepComponents.get(this._previousStep())?.hide();
      const currentStepComponent = this.stepsComponent.stepComponents.get(this.step());
      currentStepComponent?.show();
      this.currentStepComponent.set(currentStepComponent);
    }, {allowSignalWrites: true});
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

  ngAfterContentChecked(): void {
    this.currentStepActionsRef.set(this.currentStepComponent()?.stepActionsDirective?.templateRef || null);
  }

  scrollToTop() {
    (this.el.nativeElement as HTMLElement).scrollTo({behavior: 'smooth', top: 0});
  }
}
