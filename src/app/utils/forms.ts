import {FormControl} from '@angular/forms';

export function getTrueControlsNames(formGroup: { [key in string]: FormControl<boolean | null> }) {
  const keys: string[] = [];

  for (const key of Object.getOwnPropertyNames(formGroup)) {
    if (formGroup[key].value) {
      keys.push(key);
    }
  }

  return keys;
}
