import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Input, Output,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'app-checkbox'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ]
})
export class CheckboxComponent {

  private static _id = 1;
  id = 'app-checkbox-id-' + CheckboxComponent._id++;
  @Input() checked!: boolean;
  @Input() disabled!: boolean;
  @Output() click = new EventEmitter<Event>();

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  markForCheck() {
    this.cdr.markForCheck();
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

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(obj: any): void {
    this.checked = obj;
  }

  _onChange($event: Event) {
    $event.stopPropagation();
    this.onChange(($event.target as HTMLInputElement).checked);
  }

  _onClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  _onTouched() {
    this.onTouched();
  }
}
