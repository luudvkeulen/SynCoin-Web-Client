import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password');
    const passwordvalidation = AC.get('passwordvalidation');
    if (password.value !== passwordvalidation.value) {
      console.log('false');
      passwordvalidation.setErrors({MatchPassword: true});
    } else {
      console.log('true');
      return null;
    }
  }
}
