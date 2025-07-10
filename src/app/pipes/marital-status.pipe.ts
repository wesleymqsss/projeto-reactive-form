import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maritalStatus',
  standalone: false
})
export class MaritalStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
