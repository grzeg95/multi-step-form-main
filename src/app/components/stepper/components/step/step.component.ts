import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  signal,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {AbstractControlActionsDirective} from '../../../../directives/abstract-control-actions.directive';
import {StepActionsDirective} from '../../directives/step-actions.directive';
import {StepLabelDirective} from '../../directives/step-label.directive';

@Component({
  selector: 'app-step',
  standalone: true,
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepComponent {

  @ContentChild(AbstractControlActionsDirective, {descendants: true}) abstractControlActions!: AbstractControlActionsDirective;
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

      if (this.stepControl instanceof FormGroup) {
        for (const [i, key] of Object.keys((this.stepControl as FormGroup).controls).entries()) {
          if ((this.stepControl as FormGroup).controls[key].invalid) {
            this.abstractControlActions.focus(i);
            break;
          }
        }
      }
    }
  }

  hide() {
    this.isVisible.set(false);
  }

  show() {
    this.isVisible.set(true);
  }
}
