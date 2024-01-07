import {ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-on',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-on.component.html',
  styleUrl: './add-on.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddOnComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOnComponent implements ControlValueAccessor {

  @Input({required: true}) name!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;

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
