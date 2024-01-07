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

    this.onChanged(!this.checked);
  }

  public regOnChange = (_: any) => {};

  public regOnTouched = () => {};

  registerOnChange(fn: any): void {
    this.regOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.regOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.checked = obj;
  }

  onChanged($event: Event | boolean) {

    if (typeof $event === 'boolean') {
      this.regOnChange($event);
      this.writeValue($event);
      return;
    }

    this.regOnChange(($event.target as HTMLInputElement).checked);
    this.writeValue(($event.target as HTMLInputElement).checked);
  }
}
