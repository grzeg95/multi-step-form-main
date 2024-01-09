import {ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'app-switch'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {

  private static _id = 1;
  id = 'app-switch-id-' + SwitchComponent._id++;
  checked!: boolean;
  isDisabled!: boolean;

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

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
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
