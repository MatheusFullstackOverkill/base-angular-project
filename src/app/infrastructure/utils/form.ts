import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static required(error?: string, type?: 'string' | 'number'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(typeof control.value === 'object' && Object.keys(control.value).length > 0) {
        return null
      } else if(type == 'number' && parseInt(control.value) > 0) {
        return null
      } else if(type !== 'number' && control.value) {
        return null
      };
      return {required: error ? error : 'Campo obrigatório'};
    };
  }

  static format(regex: RegExp, error?: string | string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const testResult = regex.test(control.value)
      return testResult ? null : {format: error ? error : 'Formato inválido'};
    };
  }

  static equals(comparable: string, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === comparable ? null : {format: error ? error : 'Valores não são iguals'};
    }
  }

  static minLength(length: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length >= length ? null : {format: error ? error : `Campo com mínimo de ${length} digitos`};
    };
  }

  static maxLength(length: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return ( control.value && control.value.length <= length ) || control.value == '' ? null : {format: error ? error : `Campo com máximo de ${length} digitos`};
    };
  }
}

export function formValidator(form: FormGroup, errorsObject: Record<string, string[] | string[][][]>) {
    Object.keys(form.controls).map(control => {
      errorsObject[control] = form.controls[control].errors ? Object.values(form.controls[control].errors as object) : [];
    });
    return Object.values(errorsObject).filter(x => x.length > 0).length == 0;
}

export function manualValidator(value: any, validators: any[]) {

}