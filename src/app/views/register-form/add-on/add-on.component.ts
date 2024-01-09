import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';
import {CheckboxComponent} from '../../../components/checkbox/checkbox.component';

@Component({
  selector: 'app-add-on',
  standalone: true,
  imports: [
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-on.component.html',
  styleUrl: './add-on.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-add-on'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddOnComponent),
      multi: true
    }
  ]
})
export class AddOnComponent implements ControlValueAccessor, AfterViewInit {

  private static _id = 1;
  readonly id = 'app-add-on-id-' + AddOnComponent._id++;

  @Input({required: true}) name!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;
  @Input() @HostBinding('class.app-add-on--checked') checked = false;
  @ViewChild('checkbox') checkbox!: CheckboxComponent;
  formControl!: FormControl;
  wasCheckboxClicked = false;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
  }

  @HostListener('click', ['$event'])
  handleOnClick($event: Event) {

    $event.stopPropagation();
    const val = this.formControl.value;

    if (!this.wasCheckboxClicked) {
      this.formControl.setValue(!val);
      this.checkbox.markForCheck();
    }

    setTimeout(() => {
      this.checked = this.formControl.value;
      this.wasCheckboxClicked = false;
    });
  }

  handleClick($event: Event) {
    this.wasCheckboxClicked = true;
  }

  ngAfterViewInit(): void {
    try {
      this.formControl = this.injector.get(NgControl).control as FormControl;
      this.cdr.markForCheck();
      this.formControl.valueChanges.subscribe((checked) => this.checked = checked);
    } catch {
      throw new Error('Provide form control');
    }
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

  writeValue(obj: any): void {
  }
}
