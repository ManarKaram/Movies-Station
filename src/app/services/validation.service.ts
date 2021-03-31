import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }

    emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    numerical = '^[0-9]*$';
    passwordPattern = /^.(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_-]).*$/;
    alphaPattern = /[\p{a-zA-zا-ي أ-ي}]/;

    // this is custom validator to check if password and retyped password are matching
    matchingPasswords(): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            return control.get('password').value !== control.get('password_confirmation').value ? { 'unmatchedPasswords': true } : null;
        };
    }
}
