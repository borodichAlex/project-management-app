import { AbstractControl } from '@angular/forms';

export function isLettNumbMix(control: AbstractControl) {
  const isLetter = /\p{L}/u.test(control.value);
  const isNumber = /\p{N}/u.test(control.value);
  const lettNumbMix = isLetter && isNumber;
  if (!lettNumbMix) {
    return {
      lettNumbMix: true,
    };
  }
  return null;
}
