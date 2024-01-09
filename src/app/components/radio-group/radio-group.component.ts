import {Component} from '@angular/core';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent {
  private static _id = 1;
  id = 'app-radio-group-id-' + RadioGroupComponent._id++;
}
