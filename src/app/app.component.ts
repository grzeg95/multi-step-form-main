import {Dialog} from '@angular/cdk/dialog';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RegisterFormComponent} from './views/register-form/register-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    public dialog: Dialog,
  ) {
  }

  ngOnInit() {
    this.dialog.open(RegisterFormComponent, {
      width: '100%',
      maxWidth: '947px',
      panelClass: 'register-dialog',
      hasBackdrop: false,
    });
  }
}
