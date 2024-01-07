import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  Injector,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @HostBinding('class.small') @Input() small = false;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Input({required: true}) label!: string;
  @Input({required: true}) placeholder!: string;
  isDisabled = false;
  value = '';
  injector = inject(Injector)
  control: FormControl | undefined;

  ngOnInit() {

    try {
      const ngControl = this.injector.get(NgControl);

      if (ngControl instanceof FormControlName) {
        this.control = this.injector.get(FormGroupDirective).getControl(ngControl);
      } else {
        this.control = (ngControl as FormControlDirective).form as FormControl;
      }
    } catch {
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (value: string | null) => string): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange = (value: string | null): string | null => value;

  onTouched = (): void => {
  };

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleOnInput($event: Event) {
    this.writeValue(($event.target as HTMLInputElement).value);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
