import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {AfterViewInit, Component, ElementRef, forwardRef, inject, Input, Renderer2, ViewChild} from '@angular/core';
import {CheckboxControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-on',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    JsonPipe
  ],
  templateUrl: './add-on.component.html',
  styleUrl: './add-on.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddOnComponent),
      multi: true,
    }
  ]
})
export class AddOnComponent extends CheckboxControlValueAccessor implements AfterViewInit {

  @Input() value!: string;
  @Input({required: true}) name!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  renderer = inject(Renderer2);
  checked = false;

  override writeValue(value: boolean): void {
    super.writeValue(value);
    this.checked = value;
    this.input && this.renderer.setProperty(this.input.nativeElement, 'checked', this.checked);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.input && this.renderer.setProperty(this.input.nativeElement, 'checked', this.checked))
  }
}
