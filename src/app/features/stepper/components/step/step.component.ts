import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef
} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {StepLabelDirective} from '../../directives/step-label.directive';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {

  @Input() stepControl: AbstractControl | undefined;
  @ContentChild(StepLabelDirective, {
    read: TemplateRef,
    static: true
  }) appStepLabelTemplate: TemplateRef<any> | undefined;

  get valid() {

    if (this.stepControl) {
      return this.stepControl.valid;
    }

    return true;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  updateValueAndValidity(): void {
    if (this.stepControl) {
      this.stepControl.updateValueAndValidity();
      this.stepControl.markAllAsTouched();

      // TODO focus first input with error
    }
  }

  hide() {
    this.renderer.addClass(this.el.nativeElement, 'hidden');
  }

  show() {
    this.renderer.removeClass(this.el.nativeElement, 'hidden');
  }
}
