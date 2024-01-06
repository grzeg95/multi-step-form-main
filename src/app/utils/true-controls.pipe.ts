import {Pipe, PipeTransform} from '@angular/core';
import {FormControl} from '@angular/forms';
import {getTrueControlsNames} from './forms';

@Pipe({
  name: 'trueControls',
  standalone: true,
  pure: false
})
export class TrueControlsPipe implements PipeTransform {

  transform(formGroup: { [key in string]: FormControl<boolean | null> }): string[] {
    return getTrueControlsNames(formGroup);
  }
}
