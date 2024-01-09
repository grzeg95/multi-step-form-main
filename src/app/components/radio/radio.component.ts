import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RadioGroupComponent} from '../radio-group/radio-group.component';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-radio'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor, OnInit {

  private static _id = 1;
  id = 'app-radio-id-' + RadioComponent._id++;
  name = '';

  @Input() checked!: boolean;
  formValue!: string;
  @Input() disabled!: boolean;
  @Output() click = new EventEmitter<Event>();
  @Input({required: true}) value!: string;
  @Input() hidden = false;

  constructor(
    @Host() private radioGroupComponent: RadioGroupComponent
  ) {
  }

  ngOnInit(): void {
    this.name = this.radioGroupComponent.id;
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

  writeValue(value: any): void {
    this.formValue = value;
    this.checked = this.formValue === this.value;
  }

  _onChange($event: Event) {
    $event.stopPropagation();
    this.onChange(this.value);
  }

  _onClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  _onTouched() {
    this.onTouched();
  }
}
