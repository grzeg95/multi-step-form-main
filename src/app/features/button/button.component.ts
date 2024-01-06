import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @HostBinding('class.small') @Input() small = false;
}
