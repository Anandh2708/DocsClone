import { Directive, Inject } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { UserService } from '../../users/services/user-service';


@Directive({
  selector: '[uniqueEmail]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true }
  ]
})
export class UniqueEmailDirective implements AsyncValidator {

  constructor(@Inject("UserService") private userService: UserService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailValidator(this.userService)(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
  }

}

export const uniqueEmailValidator = (userService: UserService): AsyncValidatorFn => {

  var actualValidator: AsyncValidatorFn = (control: AbstractControl<any, any>)
              : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      return (<Observable<boolean>>userService
                .isEmailRegistered(control.value))
                .pipe(
                  map( (registered:boolean)=>{
                    if(registered)
                      return {uniqueEmail:{message:`duplicate email id`}};
                    else
                      return null;
                  })
                );
  };

  return actualValidator;
}

