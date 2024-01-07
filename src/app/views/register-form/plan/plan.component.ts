import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlanComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent implements ControlValueAccessor {

  @Input({required: true}) value!: string;
  @Input({required: true}) yearlyDiscountDescription!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;
  @Input({required: true}) priceName!: string;
  @Input({required: true}) icon!: string;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

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
