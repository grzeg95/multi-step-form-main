import {NgOptimizedImage} from '@angular/common';
import {AfterViewInit, Component, ElementRef, forwardRef, inject, Input, Renderer2, ViewChild} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR, RadioControlValueAccessor, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
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
export class PlanComponent extends RadioControlValueAccessor implements AfterViewInit {

  @Input({required: true}) yearlyDiscountDescription!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;
  @Input({required: true}) priceName!: string;
  @Input({required: true}) icon!: string;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  renderer = inject(Renderer2);
  state = false;

  override writeValue(value: any): void {
    super.writeValue(value);
    this.state = value === this.value;
    this.input && this.renderer.setProperty(this.input.nativeElement, 'checked', this.state);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.input && this.renderer.setProperty(this.input.nativeElement, 'checked', this.state))
  }
}
