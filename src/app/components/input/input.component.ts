import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding, HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-input'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  private static _id = 1;
  id = 'app-input-id-' + InputComponent._id++;

  @HostBinding('class.small') @Input() small = false;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Input({required: true}) label!: string;
  @Input({required: true}) placeholder!: string;

  disabled!: boolean;
  value = '';

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    $event.stopPropagation();

    setTimeout(() => {
      if(document.activeElement !== this.input.nativeElement) {
        this.input.nativeElement.focus();
      }
    })
  }

  public onChange = (_: any) => {
  };

  public onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  _onChange($event: Event) {
    $event.stopPropagation();
    this.onChange(($event.target as HTMLInputElement).value);
  }

  _onInput($event: Event) {
    $event.stopPropagation();
    this.onChange(($event.target as HTMLInputElement).value);
  }

  _onTouched() {
    this.onTouched();
  }
}
