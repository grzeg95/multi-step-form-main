import { Component } from '@angular/core';
import {RegisterFormComponent} from './views/register-form/register-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
