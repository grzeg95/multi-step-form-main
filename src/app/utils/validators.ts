import {AbstractControl, ValidationErrors} from '@angular/forms';
import {PhoneNumberUtil} from 'google-libphonenumber';

export class CustomValidators {
  static phone(control: AbstractControl): ValidationErrors | null {

    if (!control.value.trim()) {
      return null;
    }

    try {
      PhoneNumberUtil.getInstance().parseAndKeepRawInput(control.value.trim());
      return null;
    } catch (e) {
      return {phone: true};
    }
  }
}
