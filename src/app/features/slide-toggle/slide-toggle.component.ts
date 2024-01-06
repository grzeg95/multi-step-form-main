import {Component, forwardRef} from '@angular/core';
import {CheckboxControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PlanComponent} from '../../views/register-form/plan/plan.component';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlanComponent),
      multi: true,
    }
  ]
})
export class SlideToggleComponent extends CheckboxControlValueAccessor {

}
