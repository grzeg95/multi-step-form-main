import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'button[app-button-flat]',
  standalone: true,
  imports: [],
  templateUrl: './button-flat.component.html',
  styleUrl: './button-flat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonFlatComponent extends ButtonComponent {
}
