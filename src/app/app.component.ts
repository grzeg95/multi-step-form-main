import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RegisterFormComponent} from './views/register-form/register-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent  {
}
