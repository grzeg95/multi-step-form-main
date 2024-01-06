import {Component, ContentChildren, QueryList} from '@angular/core';
import {StepComponent} from '../step/step.component';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {
  @ContentChildren(StepComponent) stepComponents!: QueryList<StepComponent>;
}
