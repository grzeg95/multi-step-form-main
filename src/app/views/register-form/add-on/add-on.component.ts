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
