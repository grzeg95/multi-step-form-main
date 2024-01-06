import {Component, forwardRef, Input} from '@angular/core';
import {CheckboxControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    }
  ]
})
export class SwitchComponent extends CheckboxControlValueAccessor {
  @Input() trueTitle = '';
  @Input() falseTitle = '';
}
