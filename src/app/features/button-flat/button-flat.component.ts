import {Component} from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'button[app-button-flat]',
  standalone: true,
  templateUrl: './button-flat.component.html',
  styleUrl: './button-flat.component.scss'
})
export class ButtonFlatComponent extends ButtonComponent {
}
