import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appCompare]',
  providers:[
    {provide: NG_VALIDATORS, useExisting:CompareDirective, multi:true}
  ]
})
export class CompareDirective {

  constructor() { }

}

export const compare=(first:string,second:string):ValidatorFn=>{

  return control=>{
    var c1 = control.get(first);
    var c2= control.get(second);
    var v1=c1!.value;
    var v2=c2!.value;


    if(v1===v2)
      return null;
    else
      return {compare:{message:`The fields ${first} and ${second} don't match`}};
  }
}
