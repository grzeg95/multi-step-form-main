import {ChangeDetectionStrategy, Component, ContentChildren, QueryList} from '@angular/core';
import {StepComponent} from '../step/step.component';

@Component({
  selector: 'app-steps',
  standalone: true,
  templateUrl: './steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsComponent {
  @ContentChildren(StepComponent) stepComponents!: QueryList<StepComponent>;
}
