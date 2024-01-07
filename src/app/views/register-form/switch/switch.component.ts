import {ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, Input} from '@angular/core';
import {CheckboxControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements ControlValueAccessor {

  @Input() trueTitle = '';
  @Input() falseTitle = '';

  @HostBinding('class.checked') checked!: boolean;
  @HostBinding('class.disabled') isDisabled!: boolean;

  @HostListener('click')
  handleOnClick() {

    if (this.isDisabled) {
      return;
    }

    this.checked = !this.checked;
  }

  onChange(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched(): void {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.checked = obj;
  }
}
