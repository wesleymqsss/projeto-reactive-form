import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const requiredAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const addressGroup = control as FormGroup;

    const controlToCheck = Object.keys(addressGroup.controls).filter((controlKey) => controlKey !== 'type' && controlKey !== 'typeDescription');

    const hasAnyText = controlToCheck.some((controlKey) => hasText(addressGroup.get(controlKey)));

    for (const controlName of controlToCheck) {
        const control = addressGroup.get(controlName);

        if (hasAnyText) {
            if (!control?.value) {
                control?.setErrors({ requiredAddressValidator: true });
                control?.markAsTouched();
            } else {
                control?.setErrors(null);
            }
        } else {
            control?.setErrors(null);
        }
    }

    return null;
}

const hasText = (control: AbstractControl | null): boolean => {
    return !!control && control.value && control.value.toString().trim().length > 0;
}