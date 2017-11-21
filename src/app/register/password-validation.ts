import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static matchPassword(AC: AbstractControl): ValidationErrors | null {
    const parentForm = AC.parent;
    if (parentForm) {
      const password = parentForm.controls['password'];
      if (password.value !== AC.value) {
        return {'matchpassword': true};
      } else {
        return null;
      }
    }
    return null;
  }
}
