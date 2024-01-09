import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-plan'
  }
})
export class PlanComponent {

  @Input({required: true}) yearlyDiscountDescription!: string;
  @Input({required: true}) prices!: {monthly: string, yearly: string};
  @Input({required: true}) period!: boolean | null;
  @Input({required: true}) priceName!: string;
  @Input({required: true}) icon!: string;
  @Input() @HostBinding('class.app-plan--checked') checked = false;
}
