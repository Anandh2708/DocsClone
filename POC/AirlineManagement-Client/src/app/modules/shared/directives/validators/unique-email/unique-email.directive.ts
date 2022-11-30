import { Directive, Inject } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { UserService } from '../../../../user/services/user-service';


@Directive({
  selector: '[UniqueEmail]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true }
  ]
})
export class UniqueEmailDirective implements AsyncValidator {

  constructor(
    @Inject("UserService") private userService: UserService
  ) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailValidator(this.userService)(control);
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
            return {uniqueEmail:{message:`Email already exists`}};
          else
            return null;
        })
      );

  }
  
  return actualValidator;
  
}