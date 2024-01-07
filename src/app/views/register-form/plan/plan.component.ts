import {JsonPipe} from '@angular/common';
import {AfterViewInit, Component, ElementRef, forwardRef, HostBinding, Injector, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlanComponent),
      multi: true,
    }
  ]
})
export class PlanComponent implements ControlValueAccessor, AfterViewInit {

  @Input({required: true}) value!: string;
  @Input({required: true}) yearlyDiscountDescription!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;
  @Input({required: true}) priceName!: string;
  @Input({required: true}) icon!: string;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  @HostBinding('class.checked') checked!: boolean;
  @HostBinding('class.disabled') isDisabled!: boolean;

  ngControl!: NgControl;
  name!: string | number | null;

  constructor(private inj: Injector) {
  }

  ngAfterViewInit() {
    this.ngControl = this.inj.get(NgControl);

    setTimeout(() => {
      this.name = this.ngControl.name;
    });
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(): void {
    setTimeout(() => {
      this.checked = this.value === this.ngControl.value;
    });
  }

  onInputChange(): void {
    this.onChange(this.value);
    this.onTouched();
  }
}
