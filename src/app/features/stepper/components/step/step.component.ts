import {ChangeDetectionStrategy, Component, ContentChild, Input, signal, TemplateRef} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {StepActionsDirective} from '../../directives/step-actions.directive';
import {StepLabelDirective} from '../../directives/step-label.directive';

@Component({
  selector: 'app-step',
  standalone: true,
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {

  @Input() stepControl: AbstractControl | undefined;
  @ContentChild(StepLabelDirective, {
    read: TemplateRef,
    static: true
  }) appStepLabelTemplate: TemplateRef<any> | undefined;
  @ContentChild(StepActionsDirective) stepActionsDirective!: StepActionsDirective;
  isVisible = signal(false);

  get valid() {

    if (this.stepControl) {
      return this.stepControl.valid;
    }

    return true;
  }

  updateValueAndValidity(): void {
    if (this.stepControl) {
      this.stepControl.updateValueAndValidity();
      this.stepControl.markAllAsTouched();

      // TODO focus first input with error
    }
  }

  hide() {
    this.isVisible.set(false);
  }

  show() {
    this.isVisible.set(true);
  }
}
